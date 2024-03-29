import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import {handleAxiosError} from "@/components/utils/HandleAxiosError";
import {AddAdminType, addAdmin} from "@/services/admins/add_admin";
import {AdminEntryType} from "@/types/admin";
import {AxiosError} from "axios";
import {useState, Dispatch, SetStateAction} from "react";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";

export default function AddNewAdmin({
	setShowDialog,
}: {
	setShowDialog: Dispatch<SetStateAction<boolean>>;
}) {
	const queryClient = useQueryClient();
	const [reqError, setReqError] = useState<string | null>(null);
	const [reqResponse, setReqResponse] = useState<AdminEntryType | null>(null);
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: {errors},
	} = useForm();

	const mutation = useMutation({
		mutationFn: (payload: AddAdminType) => {
			return addAdmin(payload);
		},
		onSuccess: (data) => {
			setReqError(null);
			reset();
			setReqResponse(data.data.admin);
			queryClient.resetQueries(["admin_list"]);
		},
		onError: (error: AxiosError) => {
			handleAxiosError(error, setReqError);
		},
	});

	return (
		<div>
			{reqError && <p className="text-red-700 my-2">{reqError}</p>}
			{reqResponse && (
				<div className="mt-2">
					<p className="text-gray-600">
						Admin is added successfully. You can close this window now.
					</p>
					<div className="mt-10 flex gap-4">
						<Button
							elementState="default"
							elementStyle="black"
							elementType="button"
							elementChildren="Add another"
							onClick={() => {
								setReqResponse(null);
								mutation.reset();
							}}
						/>
						<Button
							elementState="default"
							elementStyle="black"
							elementType="button"
							elementChildren="Close"
							elementInvert={true}
							onClick={() => {
								setShowDialog(false);
								mutation.reset();
								setReqResponse(null);
							}}
						/>
					</div>
				</div>
			)}
			{!reqResponse && (
				<form
					onSubmit={handleSubmit((d) => {
						mutation.mutate(JSON.parse(JSON.stringify(d).replaceAll("ana_", "")));
					})}
				>
					<fieldset disabled={mutation.isLoading}>
						<p className="my-1 text-bb text-gray-500">* Required fields.</p>
						<div className="grid sm:grid-cols-2 grid-cols-1 gap-12">
							<div>
								<InputField
									elementId="ana_full_name"
									elementIsRequired={true}
									elementInputMinLength={2}
									elementHookFormErrors={errors}
									elementInputType="text"
									elementHookFormRegister={register}
									elementLabel="Full Name"
									elementWidth="full"
									elementInputMaxLength={48}
								/>

								<InputField
									elementId="ana_title"
									elementInputType="text"
									elementHookFormRegister={register}
									elementLabel="Job Title"
									elementIsRequired={true}
									elementHookFormErrors={errors}
									elementWidth="full"
									elementInputMaxLength={48}
								/>
							</div>
							<div>
								<InputField
									elementId="ana_username"
									elementInputMinLength={2}
									elementInputMaxLength={24}
									elementInputType="text"
									elementHookFormRegister={register}
									elementLabel="Username"
									elementIsRequired={true}
									elementHookFormErrors={errors}
									elementWidth="full"
								/>
								<InputField
									elementId="ana_password"
									elementInputType="password"
									elementHookFormRegister={register}
									elementLabel="Password"
									elementInputMinLength={8}
									elementInputMaxLength={96}
									elementIsRequired={true}
									elementIsPassword={true}
									elementHookFormErrors={errors}
									elementWidth="full"
								/>
								<InputField
									elementId="ana_confirm_password"
									elementInputType="password"
									elementHookFormRegister={register}
									elementLabel="Confirm Password"
									elementIsRequired={true}
									elementHookFormErrors={errors}
									elementHookFormWatch={watch}
									elementHookFormWatchField="ana_password"
									elementWidth="full"
								/>
							</div>
						</div>

						<div className="mt-6 flex gap-6 justify-center">
							<Button
								elementState="default"
								elementStyle="black"
								elementInvert={true}
								elementSize="base"
								elementChildren="Reset"
								elementType="reset"
								onClick={() => {
									reset();
								}}
							/>
							<Button
								elementState={
									mutation.isLoading ? "loading" : mutation.isSuccess ? "done" : "default"
								}
								elementStyle="black"
								elementSize="base"
								elementChildren="Add admin"
								elementType="submit"
							/>
						</div>
					</fieldset>
				</form>
			)}
		</div>
	);
}
