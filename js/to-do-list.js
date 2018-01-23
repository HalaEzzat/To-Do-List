function add()
{
	//get the user name
	var txt=document.getElementById("user").value;
	//search for user
	var ind=-1;
	if(localStorage.users.length)
	{
		var users = JSON.parse(localStorage.getItem("users"));
		//if the input tag of users not empty
		if(txt!=""){
		for(var i=0;i<users.length;i++)
		{
			//search for user index
			if(users[i]==txt)
			{
				ind=i;
				break;
			}
				
		}
		//if user not found ,creat new user 
		if(ind==-1)
		{
			var usr=new String();
			usr=txt;
			users.push(usr);
			ind=users.length-1;
		}
		//add the new user to the users array
		localStorage.setItem("users",JSON.stringify(users));
		}
	}
	//check if user has the entered task
	var flag=false;
	//get the task data from the input tag
	var data=document.getElementById("new-task");
	//check if input tag for task is not empty
	if(data.value!="")
	{
		
		//if todo array created
		if(localStorage.todo.length)
		{
			//get the todo array
			var todo = JSON.parse(localStorage.getItem("todo"));
			for(var i=0;i<todo.length;i++)
			{
				//check if the selected user has the selected task
				if(todo[i].data==data.value&&todo[i].userIndex==ind)
				{
					flag=true;
					break;
				}
			}
			//if selected user doesn't has the task ,added to the tasks array
			if(flag==false){
				//create new object for new task
				var task=new Object();
				//if there is data in input tag
				//assign data to the newly created object
				task.data=data.value;
				task.userIndex=ind;
				//add the newly created object to the tada array
				todo.push(task);
				localStorage.setItem("todo",JSON.stringify(todo));
			
				//display the updated arrays
				display();
			}else{
				alert("this task is already assigned in your todo list! ");
			}
			
		}
	}
}

function addUser(e)
{
	var txt=document.getElementById("user").value;
	var tag=document.getElementById("user");
	//get the key pressed  ascii code
	var keycode = (e.keyCode ? e.keyCode : e.which);
	var flag=false;
	if(keycode==13)
	{
		if(localStorage.users.length)
		{
			var users = JSON.parse(localStorage.getItem("users"));
			for(var i=0;i<users.length;i++)
			{
				if(users[i]==txt)
					flag=true;
				
			}
			if(flag==false)
			{
				var usr=new String();
				usr=txt;
				users.push(usr);
			}
			localStorage.setItem("users",JSON.stringify(users));
		}
	
	}
	updateUserList();
	

}

function removeFmSe(e)
{
	//get the search table
	var table=document.getElementById("se");
	//get the todo array
	var todo = JSON.parse(localStorage.getItem("todo"));
	//delete the todo task from the todo array by id
	todo.splice(table.rows[e.parentNode.parentNode.rowIndex].id,1);
	localStorage.setItem("todo",JSON.stringify(todo));
	//delete the row from the table
	table.deleteRow(e.parentNode.rowIndex);
		
	//update search list
	updateList();
	//update users List
	updateUserList();
	display();
}

function updateUserList()
{
	var tag2=document.getElementById("user");
	if(localStorage.users.length)
	{
		//get the users array
		var users = JSON.parse(localStorage.getItem("users"));
		//add search options from the users array
		tag2.innerHTML="<datalist id='users'></datalist>";
		var tag3=document.getElementById("users");
		for(var i=0;i<users.length;i++)
		{
			tag3.innerHTML+="<option value=\""+users[i]+"\">";
		}
	}
}

function doneFmSe(e)
{
	//get search table
	var table=document.getElementById("se");
	//get the array of done tasks
	var done = JSON.parse(localStorage.getItem("done"));
	//get the array of todos
	var todo=JSON.parse(localStorage.getItem("todo"));
	//create new object to hold the data of the newly done task
	var obj=new Object();
	obj.data=todo[table.rows[e.parentNode.parentNode.rowIndex].id].data;
	obj.userIndex=todo[table.rows[e.parentNode.parentNode.rowIndex].id].userIndex;
	//add the newly done task to the done array
	done.push(obj);
	localStorage.setItem("done",JSON.stringify(done));
	//hold the tag of the div to display the updated table of done tasks
	var tag=document.getElementById("td2-list");
	//create the table of done tasks
	tag.innerHTML="<table id='done'>";
	var table2=document.getElementById("done");	
	//loop on the array of done tasks and display them in the table
	for(var i=0;i<done.length;i++)
	{
		table2.innerHTML+="<tr id='"+i+"'><td class='t'>"+done[i].data+"</td><td><button  onclick='removeDone(this)'>delete</button></td></tr>";
	}
	//close the table tag
	table2.innerHTML+="</table>";
	
	//delete the done task from the tasks array
	todo.splice(table.rows[e.parentNode.parentNode.rowIndex].id,1);
	localStorage.setItem("todo",JSON.stringify(todo));
	//delete row of the done task from the todos table
	table.deleteRow(e.parentNode.parentNode.rowIndex);
	
	
	//update the search list
	updateList();
	display();
}

function removeDnFmSe(e)
{
	//get the search table
	var table=document.getElementById("se");
	//get the done array
	var done = JSON.parse(localStorage.getItem("done"));
	//delete done task
	done.splice(table.rows[e.parentNode.parentNode.rowIndex].id,1);
	localStorage.setItem("done",JSON.stringify(done));
	//delete row from the search table
	table.deleteRow(e.parentNode.parentNode.rowIndex);
	
	//update the search list
	updateList();
	display();
}

function searchUser(name)
{
	var ind=-1;
	if(localStorage.users.length)
	{
		//get the users array
		var user = JSON.parse(localStorage.getItem("users"));
			
		for(var i=0;i<user.length;i++)
		{
			if(user[i]==name)
				return i;
		}
	}
	return ind;
}

function search(e)
{
	//get the drop down list selected value
	var selected=document.getElementById("selected").value;
	//get the task user searching for
	var txt=document.getElementById("data").value;
	//get user name
	var user=document.getElementById("user").value;
	//index of user
	var ind=-1;
	//hold the div tag
	var tag=document.getElementById("search");
	//get the key pressed  ascii code
	var keycode = (e.keyCode ? e.keyCode : e.which);
	//create search table 
	tag.innerHTML="<table id='se'>";
	var table=document.getElementById("se");
	if(txt!="")
		ind=searchUser(user);
	//check if user pressed 'enter' and selected 'all'
	if(keycode==13 && selected=="all"){
		//check if todos array has tasks
		if(localStorage.todo.length)
		{	
			//get the todo array
			var todo = JSON.parse(localStorage.getItem("todo"));
			
			for(var i=0;i<todo.length;i++)
			{
				if(todo[i].data==txt&&todo[i].userIndex==ind)
				table.innerHTML+="<tr id='"+i+"'><td>"+todo[i].data+"</td><td><button onclick='removeFmSe(this)'>delete</button></td><td><button onclick='doneFmSe(this)'>done</button></td></tr>";
			}
			
		}
		//check if done array has tasks
		if(localStorage.done.length)
		{
			//get the done array
			var done = JSON.parse(localStorage.getItem("done"));
			for(var i=0;i<done.length;i++)
			{
				if(done[i].data==txt&&done[i].userIndex==ind)
				table.innerHTML+="<tr id='"+i+"'><td>"+done[i].data+"</td><td><button onclick='removeDnFmSe(this)'>delete</button></td></tr>";
			}
		}
		
	}
	//check if user pressed 'enter' and selected 'tasks'
	else if(keycode==13 && selected=="tasks")
	{
		if(localStorage.todo.length)
		{
			//get the todo array
			var todo = JSON.parse(localStorage.getItem("todo"));
			//display the task user searching for
			for(var i=0;i<todo.length;i++)
			{
				if(todo[i].data==txt&&todo[i].userIndex==ind)
				table.innerHTML+="<tr id='"+i+"'><td>"+todo[i].data+"</td><td><button onclick='removeFmSe(this)'>delete</button></td><td><button onclick='doneFmSe(this)'>done</button></td></tr>"
			}
		}
	}
	//check if user pressed 'enter' and selected 'done'
	else if(keycode==13 && selected=="done")
	{
		//check if done array has tasks
		if(localStorage.done.length)
		{
			//get the done array
			var done = JSON.parse(localStorage.getItem("done"));
			for(var i=0;i<done.length;i++)
			{
				if(done[i].data==txt&&done[i].userIndex==ind)
				table.innerHTML+="<tr id='"+i+"'><td>"+done[i].data+"</td><td><button onclick='removeDnFmSe(this)'>delete</button></td></tr>";
			}
		}
	}
	//close table tag
	table.innerHTML+="</table>";
}

function removeTask(e)
{
	//get the todo table
	var table=document.getElementById("show");
	//get the todo array
	var todo = JSON.parse(localStorage.getItem("todo"));
	//delete the todo task from the todo array
	todo.splice(e.parentNode.parentNode.rowIndex,1);
	localStorage.setItem("todo",JSON.stringify(todo));
	//delete the row from the table
	table.deleteRow(e.parentNode.rowIndex);
	//update table rows ids after deletion
	for(var i=0;i<table.rows.length;i++)
	{
			
		table.rows[i].id=i;
	}
		
	//update search list
	updateList();

	
}

function removeDone(e)
{
	//get the done table
	var table=document.getElementById("done");
	//get the done array
	var done = JSON.parse(localStorage.getItem("done"));
	//delete done task
	done.splice(e.parentNode.parentNode.rowIndex,1);
	localStorage.setItem("done",JSON.stringify(done));
	//delete row from the done table
	table.deleteRow(e.parentNode.parentNode.rowIndex);
	//update table rows ids after deletion
	for(var i=0;i<table.rows.length;i++)
	{
			
		table.rows[i].id=i;
	}
	//update the search list
	updateList();

}

function doneit(e)
{
	//get table of todos
	var table=document.getElementById("show");
	//get the array of done tasks
	var done = JSON.parse(localStorage.getItem("done"));
	//get the array of todos
	var todo=JSON.parse(localStorage.getItem("todo"));
	//create new object to hold the data of the newly done task
	var obj=new Object();
	obj.data=todo[e.parentNode.parentNode.rowIndex].data;
	obj.userIndex=todo[e.parentNode.parentNode.rowIndex].userIndex;
	//add the newly done task to the done array
	done.push(obj);
	localStorage.setItem("done",JSON.stringify(done));
	//hold the tag of the div to display the updated table of done tasks
	var tag=document.getElementById("td2-list");
	//create the table of done tasks
	tag.innerHTML="<table id='done'>";
	var table2=document.getElementById("done");	
	//loop on the array of done tasks and display them in the table
	for(var i=0;i<done.length;i++)
	{
		table2.innerHTML+="<tr id='"+i+"'><td class='t'>"+done[i].data+"</td><td><button  onclick='removeDone(this)'>delete</button></td></tr>";
	}
	//close the table tag
	table2.innerHTML+="</table>";
	
	//delete the done task from the tasks array
	todo.splice(e.parentNode.parentNode.rowIndex,1);
	localStorage.setItem("todo",JSON.stringify(todo));
	//delete row of the done task from the todos table
	table.deleteRow(e.parentNode.parentNode.rowIndex);
	
	
	//update the search list
	updateList();
	
}
function updateList()
{
	//get selected element from the drop down list
	var selected=document.getElementById("selected").value;
	//hold the tag of the search list to add options
	var tag2=document.getElementById("data");
	//get user name
	var user=document.getElementById("user").value;
	//index of default user
	var ind=-1;
	//search for user index by entered name
	ind=searchUser(user);
	//check if user wants to search in all tasks
		if(selected=="all")
		{	
			if(localStorage.todo.length)
			{
				//get the todos array
				var todo = JSON.parse(localStorage.getItem("todo"));
				//add search options from the todos array
				tag2.innerHTML="<datalist id='tasks'></datalist>";
				var tag3=document.getElementById("tasks");
				for(var i=0;i<todo.length;i++)
				{
					//add tasks of selected user to options
					if(todo[i].userIndex==ind)
					tag3.innerHTML+="<option value=\""+todo[i].data+"\">";
				}
			}
				
			//check if the done array has any elements?
			if(localStorage.done.length)
			{
				//if true,then add the search options from the done array
				var done = JSON.parse(localStorage.getItem("done"));
				for(var i=0;i<done.length;i++)
				{
					//add tasks of selected user to options
					if(done[i].userIndex==ind)
					tag3.innerHTML+="<option value=\""+done[i].data+"\">";
				}
			}
		}
	//check if user wants to search the todos tasks only
		else if(selected=="tasks")
		{
			if(localStorage.todo.length)
			{
				//get the todos array 
				var todo = JSON.parse(localStorage.getItem("todo"));
				//add search options from the todos array only!
				tag2.innerHTML="<datalist id='tasks'></datalist>";
				var tag3=document.getElementById("tasks");
				for(var i=0;i<todo.length;i++)
				{
					//add tasks of selected user to options
					if(todo[i].userIndex==ind)
					tag3.innerHTML+="<option value=\""+todo[i].data+"\">";
				}
			}
		}	
	//check if the user wants to search the done tasks only
		else if(selected=="done")
		{
			//check if there any done tasks in the done array!
			if(localStorage.done.length)
			{
				//add search options from the done array only!
				done=JSON.parse(localStorage.getItem("done"));
				tag2.innerHTML="<datalist id='tasks'></datalist>";
				var tag3=document.getElementById("tasks");
				for(var i=0;i<done.length;i++)
				{
					//add tasks of selected user to options
					if(done[i].userIndex==ind)
					tag3.innerHTML+="<option value=\""+done[i].data+"\">";
				}
			}
		}	
}

function display()
{
	//this function will run when body tag load and whenever someone add,delete tasks from the arrays
	//check if the localstorage has the arrays:todo and done
	if(localStorage.hasOwnProperty("todo")==false)
	{
		//create the todo array
		var arr=new Array();
		localStorage.setItem("todo", JSON.stringify(arr));
	}
	if(localStorage.hasOwnProperty("done")==false)
	{
		//create the done array
		var arr2=new Array();
		localStorage.setItem("done", JSON.stringify(arr2));
	}
	if(localStorage.hasOwnProperty("users")==false)
	{
		//create the users array
		var arr3=new Array();
		localStorage.setItem("users", JSON.stringify(arr3));
	}

	//hold the div tag to display the table
	var tag=document.getElementById("tdl-list");
	//check if the todo array has tasks to display
	if(localStorage.todo.length){
		//get the todo array
		var todo = JSON.parse(localStorage.getItem("todo"));
		//create the todo table
		tag.innerHTML="<table id='show'>";
		var table=document.getElementById("show");
		for(var i=0;i<todo.length;i++)
		{
			//display the data from the todo array in the todo table
			table.innerHTML+="<tr id='"+i+"'><td>"+todo[i].data+"</td><td><button onclick='removeTask(this)'>delete</button></td><td><button onclick='doneit(this)'>done</button></td></tr>"
		}	
		//close the table tag
		table.innerHTML+="</table>";

	}
	//check if the done array has tasks to display
	if(localStorage.done.length)
	{
		//get the done array
		var done = JSON.parse(localStorage.getItem("done"));
		var tag4=document.getElementById("td2-list");
		//create the done table
		tag4.innerHTML="<table id='done'>";
		var table2=document.getElementById("done");	
		for(var i=0;i<done.length;i++)
		{
			//display the data from the done array
			table2.innerHTML+="<tr id='"+i+"'><td class='t'>"+done[i].data+"</td><td><button  onclick='removeDone(this)'>delete</button></td></tr>";
			
		}
		//close the table tag
		table2.innerHTML+="</table>";
	}
	//update the search list
	updateList();
	//update user List
	updateUserList();

	
}