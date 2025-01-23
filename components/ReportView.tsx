"use client";

import { useEffect } from "react";
export type pageTrackerType="blog"|"forum"
export const ReportView: React.FC<{ id: string,type:pageTrackerType }> = ({ id,type }) => {
	useEffect(() => {
		fetch("/api/incr", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id,type }),
		});
	}, [id,type]);

	return null;
};