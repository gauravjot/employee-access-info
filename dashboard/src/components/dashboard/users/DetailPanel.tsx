import {useQuery} from "react-query";
import {useState} from "react";
import Spinner from "@/components/ui/Spinner";
import ClientAdminister from "./tabs/Administer";
import Notes from "./tabs/Notes";
import {getUser} from "@/services/user/get_user";

export default function UserDetailPanel({userID}: {userID: string}) {
	const userQuery = useQuery(["user_" + userID], () => getUser(userID));
	const [activeTab, setActiveTab] = useState<"administer" | "notes">("administer");

	return userQuery.isSuccess ? (
		<>
			<div className="border-b sticky top-0 z-[5] bg-white">
				<div className="flex gap-6 px-8 py-6">
					<div className="h-16 w-16 bg-gray-200 rounded-full flex place-items-center justify-center capitalize text-4xl text-gray-400">
						{userQuery.data.name[0]}
					</div>
					<div>
						<h1 className="text-3xl tracking-tight">{userQuery.data.name} </h1>
						<div className="text-gray-500">{userQuery.data.role}</div>
					</div>
				</div>
				<div className="text-bb px-8 flex gap-6">
					<button
						onClick={() => {
							setActiveTab("administer");
						}}
						className={
							(activeTab === "administer"
								? "text-dodger-700 border-dodger-600"
								: "text-gray-600 border-transparent") + " border-b-2 p-2 active:bg-dodger-50"
						}
					>
						Administer
					</button>
					<button
						onClick={() => {
							setActiveTab("notes");
						}}
						className={
							(activeTab === "notes"
								? "text-dodger-700 border-dodger-600"
								: "text-gray-600 border-transparent") + " border-b-2 p-2 active:bg-dodger-50"
						}
					>
						Notes
						{/* <span className="text-sm">
							{userQuery.data.notes && userQuery.data.notes.length > 0 ? " (" + userQuery.data.notes.length + ")" : ""}
						</span> */}
					</button>
				</div>
			</div>
			{activeTab === "administer" && <ClientAdminister user={userQuery.data} />}
			{activeTab === "notes" && <Notes user={userQuery.data} />}
		</>
	) : userQuery.isLoading ? (
		<div className="h-full flex place-items-center justify-center">
			<Spinner color="accent" size="xl" />
		</div>
	) : (
		<></>
	);
}