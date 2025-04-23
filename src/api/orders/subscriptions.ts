import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useInsertOrderSubscription() {
  const queryClient = useQueryClient();
  useEffect(() => {
    const ordersSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload);
          queryClient.invalidateQueries(["orders"]);
        }
      )
      .subscribe();

    /**
     * funkcja return uruchmiana gdy useEffect zostaje zamknięty.
     */
    return () => {
      ordersSubscription.unsubscribe();
    };
  }, []);
}

export function useUpdateOrderSubscription( id : number ) {
  const queryClient = useQueryClient();
  useEffect(() => {
    const ordersSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders", filter : `id=eq.${id}` }, // eq.id - nie wiem dlaczego to działa
        (payload) => {
          console.log("Change received!", payload);
          queryClient.invalidateQueries(["orders", id ]);
        }
      )
      .subscribe();

    /**
     * funkcja return uruchmiana gdy useEffect zostaje zamknięty.
     */
    return () => {
      ordersSubscription.unsubscribe();
    };
  }, []);
}