let domoRenderer;
let domoForm;
let DomoFormClass;
let DomoListClass;

const handleDomo = (e) => {
	e.preventDefault();

	$("#domoMessage").animate({width:'hide'}, 350);

	if($("#domoMessage").val() == '' || #("#domoAge").val() == '') {
		handleError("Rawr, all fields needed");
		return false;
	}

	sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
		domoRenderer.loadDomosFromServer();
	});

	return false;
};

const renderDomo = function() {

	return (
		<form id="domoForm"
			onSubmit={this.handleSubmit}
			name="domoForm"
			action="/maker"
			method="POST"
			className="domoForm"
		>
			<label htmlFor="name">Name: </label>
			<input id="domoName" type="text" name="name" placeholder="Domo Name" />
			<label htmlFor="age">Age: </label>
			<input id="domoAge" type="text" name="age" placeholder="Domo Age" />
			<input type="hidden" name="_csrf" value={this.props.csrf} />
			<input className="makeDomoSubmit" type="submit" value="Make Domo" />
		</form>

	);
};

const renderDomoList = function() {
	if(this.state.data.length === 0) {
		return (
			<div className="domoList">
				<h3 className="emptyDomo">No Domos yet</h3>
			</div>
		);
	}

	const domoNodes = this.state.data.map(function(domo) {
		return (
			<div key={domo._id} className="domo">
				<img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
				<h3 className="domoName">Name: {domo.name} </h3>
				<h3 className="domoAge">Age: {domo.age} </h3>
		);	</div>
	});

	return (
		<div className="domoList">
			{domoNodes}
		</div>
		)
};