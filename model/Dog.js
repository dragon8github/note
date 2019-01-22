class Dog {
	constructor (name, age) {
		// super();
		// 建议内置的变量加个_区分，而要访问的变量用get关键词来识别返回
		this._name = name;
		this._age = age;
	}

	get name() {
		return this.name
	}

	set name(value) {
		this._name = value
	}

	get age() {
		return this._age
	}

	set age(value) {
		this._age = value
	}

	static version () {
		return 'v0.1.0';
	}

	toString () {
        return `name： ${this._name}，age：${this._age}`
    }
}