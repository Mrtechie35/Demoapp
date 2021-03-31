
const url = 'http://localhost:5000/getSectorDetails'; 
const fetchUsers = async () => {
    try {
       const res = await fetch(url);
     // check for 404 error
       if (!res.ok) { 
           throw new Error(res.status);
       }
	   const sample = await res.json();
	  
	//    /document.getElementById("myText").value =new Date();
	   $('table').bootstrapTable({ data: sample.data });
	 //  $('table').DataTable();
     $('.dataTables_length').addClass('bs-select');
	
       }
       // catch block for network errors
       catch (error) { 
            console.log(error); 
        }
}
fetchUsers( );
