class MestoApi{
	constructor(connection_data){
		this.token = connection_data.token;
		this.group = connection_data.group;
		this.baseUrl = connection_data.baseUrl;
		this.headers = {
			authorization: this.token,
			'Content-Type': 'application/json'
		}
	}

	async getUser(ui){
		const url = `${this.baseUrl}/${this.group}/users/me`;
		const request = async () => {
			const response = await fetch(url, {headers: this.headers});
			if (!response.ok) {
					throw new Error(response.status);
			}
			const result = await response.json();
			return result;
		}
		return await request();
	}

	async getCards(){
		const url = `${this.baseUrl}/${this.group}/cards`;
		const response = await fetch(url, {headers:this.headers});
		if (!response.ok) {
				throw new Error(response.status);
		}
		const result = await response.json();
		return result;
	}

	async updateUserInfo(user_info){
		const url = `${this.baseUrl}/${this.group}/users/me`;
		const req = await fetch(url, {
			method: 'PATCH',
			headers: this.headers,
			body:JSON.stringify(user_info)
		})
		if (!req.ok) {
				throw new Error(req.status);
		}
		const res = await req.json();
		return res;
	}

	async putdel_like(id, method){
		const url = `${this.baseUrl}/${this.group}/cards/like/${id}`;
		console.log(url);
		const req = await fetch(url, {
			method: method,
			headers: {authorization:this.token}
		})
		if (!req.ok) {
				throw new Error(req.status);
		}
		const res = await req.json();
		return res;
		
	}


	async create_card(name, link){
		const url = `${this.baseUrl}/${this.group}/cards`;
		const req = await fetch(url, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({name: name, link: link})
		})
		if (!req.ok) {
				throw new Error(req.status);
		}
	
		const res = await req.json();
		return res;
	}
}
