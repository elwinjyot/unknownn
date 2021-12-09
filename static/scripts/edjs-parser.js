class EdjsHTML {
	parse = (obj) => {
		let blocks = JSON.parse(obj)["blocks"];
		let html = "";
		for (let i = 0; i < blocks.length; i++) {
			const block = blocks[i];
			html += this.parseBlock(block);
		}
		return html;
	};
	parseBlock = (block) => {
		switch (block["type"]) {
			case "paragraph":
				return `<p style="text-align: ${block["data"]["alignment"]};">${block["data"]["text"]}</p>`;
				break;

			case "header":
				return `<h${block["data"]["level"]} style="padding: 1.2rem 0rem;">${block["data"]["text"]}</h${block["data"]["level"]}>`;
				break;

			case "image":
				return `<div class="image-full"><img src="${block["data"]["file"]["url"]}"/></div>`;
				break;

			default:
				break;
		}
	};
}
