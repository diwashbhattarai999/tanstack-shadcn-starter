import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { showSubmittedData } from "@/lib/show-submitted-data";

const items = [
	{
		id: "recents",
		label: "Recents",
	},
	{
		id: "home",
		label: "Home",
	},
	{
		id: "applications",
		label: "Applications",
	},
	{
		id: "desktop",
		label: "Desktop",
	},
	{
		id: "downloads",
		label: "Downloads",
	},
	{
		id: "documents",
		label: "Documents",
	},
] as const;

const displayFormSchema = z.object({
	items: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: "You have to select at least one item.",
	}),
});

type DisplayFormValues = z.infer<typeof displayFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
	items: ["recents", "home"],
};

export function DisplayForm() {
	const form = useForm<DisplayFormValues>({
		resolver: zodResolver(displayFormSchema),
		defaultValues,
	});

	const selectedItems = form.watch("items") || [];

	const handleCheckboxChange = (itemId: string, checked: boolean) => {
		const currentItems = form.getValues("items") || [];
		if (checked) {
			form.setValue("items", [...currentItems, itemId]);
		} else {
			form.setValue(
				"items",
				currentItems.filter((value) => value !== itemId)
			);
		}
	};

	return (
		<form
			className="space-y-8"
			onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
		>
			<FieldSet data-invalid={!!form.formState.errors.items}>
				<div className="mb-4">
					<FieldLegend variant="label">Sidebar</FieldLegend>
					<FieldDescription>
						Select the items you want to display in the sidebar.
					</FieldDescription>
				</div>
				{items.map((item) => (
					<Field className="items-start" key={item.id} orientation="horizontal">
						<Checkbox
							checked={selectedItems.includes(item.id)}
							id={item.id}
							onCheckedChange={(checked) =>
								handleCheckboxChange(item.id, checked as boolean)
							}
						/>
						<FieldLabel className="font-normal" htmlFor={item.id}>
							{item.label}
						</FieldLabel>
					</Field>
				))}
				<FieldError errors={[form.formState.errors.items]} />
			</FieldSet>

			<Button type="submit">Update display</Button>
		</form>
	);
}
