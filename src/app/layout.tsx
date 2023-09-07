import React from "react";

export default function RootLayout({children}: { children: React.ReactNode }) {
	return (
		<html lang="en">
		<head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
			<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			<title>Coin</title>
		</head>
		<body>{children}</body>
		</html>
);
}