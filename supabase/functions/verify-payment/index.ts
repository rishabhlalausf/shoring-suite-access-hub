import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { session_id } = await req.json();
    
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    console.log("Verifying payment for session:", session_id);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Verify the payment session
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Payment not completed" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    console.log("Payment verified, getting license code...");

    // Use service role to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get an unused license code
    const { data: availableCodes, error: fetchError } = await supabase
      .from("license_codes")
      .select("*")
      .eq("is_used", false)
      .limit(1);

    if (fetchError) {
      console.error("Error fetching codes:", fetchError);
      throw new Error("Error retrieving license code");
    }

    if (!availableCodes || availableCodes.length === 0) {
      throw new Error("No license codes available");
    }

    const licenseCode = availableCodes[0];

    // Mark the code as used
    const { error: updateError } = await supabase
      .from("license_codes")
      .update({
        is_used: true,
        used_at: new Date().toISOString(),
        stripe_session_id: session_id
      })
      .eq("id", licenseCode.id);

    if (updateError) {
      console.error("Error updating code:", updateError);
      throw new Error("Error processing license code");
    }

    console.log("License code assigned:", licenseCode.code);

    return new Response(JSON.stringify({ 
      success: true,
      license_code: licenseCode.code,
      session_id: session_id
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});