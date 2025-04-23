import { Database } from "@/src/database.types";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminOrderList({ archived = false }) {
  /**
   * Statuses of orders that are archived, or active. Delivered orders are archived.
   */
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
  return useQuery({
    /**
     * Ważne by dodac wszystkie zależności renderowanych danych, albo będą się nie poprawnie cache'ować
     */
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
}

export function useMyOrderList() {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: async () => {
      if (!id) throw new Error("User ID is undefined");
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
}

export function useOrderDetails(id: number) {
  return useQuery({
    queryKey: [`orders`, id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))") // Pamiętanie by poszerzyć relacje w ten sposób jest trudne
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
  });
}

export function useInsertOrder() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: Database["public"]["Tables"]["orders"]["Insert"]) {
      const { error, data: newOrder } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();
      if (error) throw new Error(error.message);
      return newOrder;
    },
    async onSuccess(data) {
      await queryClient.invalidateQueries(["orders"]);
    },
  });
}


export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, updatedFields } : { id : number, updatedFields : Database["public"]["Tables"]["orders"]["Update"] } ) {
      const { error, data: useUpdateOrder } = await supabase
        .from("orders")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return useUpdateOrder;
    },
    async onSuccess(_, data) {
      await queryClient.invalidateQueries(["orders"]);
      await queryClient.invalidateQueries(["orders", data.id] );
    },
  });
}
