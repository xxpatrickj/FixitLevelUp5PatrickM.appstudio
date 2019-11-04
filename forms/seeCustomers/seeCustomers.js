
seeCustomers.onshow=function(){
    drpList.clear()
  let query = "SELECT name FROM customer"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=pjm42085&pass=missouri1107&database=pjm42085&query=" + query)
  
  if (req1.status == 200) {
    let results = JSON.parse(req1.responseText)
    if (results.length == 0)
        txtResults.value("Invalid selection")
      else {  
        let output = ""
        for (i = 0; i <= results.length - 1; i++){
            output = output + results[i][0] + "\n"
            drpList.addItem(results[i][0])
        }
     } 
  } else{
      NSB.MsgBox("Please select an option")
  }
  hbrNav.clear()
  hbrNav.addItem("Sign out") 
  hbrNav.addItem("See Customer")
  hbrNav.addItem("Delete Customer")
  hbrNav.addItem("Edit Customer")
  hbrNav.addItem("Add Customer")
}

drpList.onclick=function(s){
  if (typeof(s) == "object"){
    return                   
    }else {
      drpList.value = s 
      let query2 = "SELECT * FROM customer WHERE name=" + '"' + drpList.selection + '"' 
      req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=pjm42085&pass=missouri1107&database=pjm42085&query=" + query2)
      if (req2.status == 200) {
          let results1 = JSON.parse(req2.responseText)
                  if (results1.length == 0){
              txtResults.value("This company does not exist.")
          }else {        
              console.log("Parsed value is " + results1)
              console.log("First value in array is " + results1[0])
              console.log("Paul needs the output of results[0][1]: " + results1[0][2])
              let message1 = ""
              for (i = 1; i <= 2; i++)
                  message1 = message1 + results1[0][i] + "\n"
              for (i =3; i <=5; i++)
                  message1 = message1 + results1[0][i] + ", "
              txtResults.value = message1
          } 
      }else{
        NSB.MsgBox("Error")
      }
   }
}


hbrNav.onclick=function(s){
   if (typeof(s) == "object") {
       return
    }
    switch(s) {
      case "Sign Out":
          hbrNav.hide()
          btnSignIn.show()
          break
      case "See Customer":
          ChangeForm(seeCustomer)
          break
       case "Edit Customer":
          ChangeForm(deleteUpdateCustomer)
          break
       case "Delete Customer":
          ChangeForm(deleteUpdateCustomer)
          break
      case "Add Customer":
          ChangeForm(addCustomer)
          break
     }
}
