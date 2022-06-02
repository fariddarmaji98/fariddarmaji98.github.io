import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

import {
	MenuRoot,
	MenuWrapper,
	MenuContent
} from './elements';

const Menus = [{
		route: "sort-character",
		label: "Sort Character",
	}, {
		route: "psbb",
		label: "Pembatasan Sosial Berskala Besar",
	}
];

const Menu = () => {
	return (
		<MenuRoot>
			<MenuWrapper>
				{Menus.map((item, index) => (
					<Link to={item.route} exac>
						<MenuContent key={index}>
								{item.label}
						</MenuContent>
					</Link>
				))}
			</MenuWrapper>
		</MenuRoot>
	);
};

export default Menu;
