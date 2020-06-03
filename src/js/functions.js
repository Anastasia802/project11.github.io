export function CreateDOMElement(params){
	let elem = document.createElement(params.tag);
	try{
		elem.className = params.classes.join(" ");
	}catch(Exception){}
	try{
		Object.entries(params.styles).forEach(([changingStyle, value]) =>{
			elem.style.cssText += `${changingStyle.split("_").join("-")}: ${value};`;
		});
	}catch(Exception){}
	try{
		Object.entries(params.events).forEach(([event_type, event_func]) =>{
			elem.addEventListener(event_type, event_func);
		})
	}catch(Exception){}
	try{
		if(params.text != undefined)
		elem.innerText = params.text;
	}catch(Exception){}
	try{
		elem.src = params.src;
	}catch(Exception){}
	try{
		elem.submit = params.submit;
	}catch(Exception){}
	try{
		if(params.name != undefined)
		elem.name = params.name;
	}catch(Exception){}
	try{
		elem.placeholder = params.placeholder;
	}catch(Exception){}
	try{
		if(params.id != undefined)
		elem.id = params.id;
	}catch(Exception){}
	try{
		if(params.value != undefined)
		elem.value = params.value;
	}catch(Exception){}
	try{
		elem.type = params.type;
	}catch(Exception){}
	try{
	}catch(Exception){}
	return elem;
}

export function Append(container){
	for (let i = 1; i < arguments.length; i++) {
		container.appendChild(arguments[i]);
	}
}