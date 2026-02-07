"use client"
import { useCreateDepartment } from "@/hooks/use-routes";


export default function NewDepartmentPage() {
  const createDepartment = useCreateDepartment();
  const handleCreate = async (formData:FormData) => {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    createDepartment.mutate({ name, description});
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-6">
        Create Department
      </h1>

      <form action={handleCreate} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            name="name"
            required
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Engineering"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Handles core system agents"
          />
        </div>


        <button
          type="submit"
          disabled={createDepartment.isPending}
          className="w-full rounded-lg bg-black text-white py-2 font-medium hover:opacity-90 "
        >
          Create Department
        </button>
      </form>
    </div>
  );
}
