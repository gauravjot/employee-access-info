import axios from "axios";
import {BACKEND_ENDPOINT} from "@/config";

/**
 * API call to change profile data
 * @param token
 * @param id
 * @param name
 * @param title
 * @param phone
 * @param email
 * @returns Promise
 */
export function updateClient(
	token: string | undefined | null,
	id: string,
	d: {
		name: string;
		type: string;
		email: string;
		phone: string;
		vat: string;
	}
) {
	return token
		? axios
				.put(
					BACKEND_ENDPOINT + "/api/invoice/client/update/",
					JSON.stringify({
						uid: id,
						name: d.name,
						type: d.type,
						email: d.email,
						phone: d.phone,
						vat: d.vat,
					}),
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: token,
						},
					}
				)
				.then((res) => {
					return res.data;
				})
		: Promise.reject();
}
