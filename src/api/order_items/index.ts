import { Database } from "@/src/database.types";
import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useInsertOrderItems() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn( items : Database["public"]["Tables"]["order_items"]["Insert"][] ) {
      const { error, data: newOrder } = await supabase
        .from("order_items")
        .insert(items)
        .select();
      if (error) throw new Error(error.message);
      return newOrder;
    },
  });
}