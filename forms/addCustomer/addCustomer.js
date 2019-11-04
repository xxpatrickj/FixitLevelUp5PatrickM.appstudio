
addCustomer.onshow=function(){
      lsgName.clear()
    let query = "SELECT name FROM customer"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=pjm42085&pass=missouri1107&database=pjm42085&query=" + query)
  if (req1.status == 200) {
    results = JSON.parse(req1.responseText)
    if (results.length == 0)
        MSB.MsgBox("Please enter values")
    else {        
        let message = ""
        for (i = 0; i <= results.length - 1; i++){
            message = results[i][0] 
            lsgName.addItem(message)
        }
     } 
  } else{
      NSB.MsgBox("Error")
  }
  hbrNav11.clear()
  hbrNav11.addItem("Sign out") 
  hbrNav11.addItem("See Customer")
  hbrNav11.addItem("Delete Customer")
  hbrNav11.addItem("Edit Customer")
  hbrNav11.addItem("Add Customer")
}


hbrNav11.onclick=function(s){
  if (typeof(s) == "object") {
       return
    }
    switch(s) {
      case "Sign Out":
          hbrNav11.hide()
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

btnSubmit1.onclick=function(){
   let newName2 = inptName.value
  let newCity2 = inptCity.value
  let newStreet2 = inptStreet.value
  let newState2 = inptState.value
  let newZipCode2 = inptZip.value
  let queryInsert = "INSERT INTO customer (name,street,city,state,zipcode) VALUES ('"+newName2+"', '"+newStreet2+"', '"+newCity2+"','"+ newState2+"'," +newZipCode2+")"
    req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=pjm42085&pass=missouri1107&database=pjm42085&query=" + queryInsert)
    if (req2.status == 200) {
        if (req2.responseText == 500) {
            lsgName.clear()
            let message = ""
            let queryNew1="SELECT name FROM customer"
            req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=pjm42085&pass=missouri1107&database=pjm42085&query=" + queryNew1)
                if (req3.status==200){
                  results=JSON.parse(req3.responseText)
                  let message = ""
                  for (i=0; i <= results.length-1; i++){
                      message = results[i][0] 
                      lsgName.addItem(message)
                  }
                 let query4 = "SELECT * FROM customer WHERE name=" + '"' + newName2 + '"'
                      req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=pjm42085&pass=missouri1107&database=pjm42085&query=" + query4)
                         if (req4.status == 200) {
                               results = JSON.parse(req4.responseText)
                               let message2 = ""
                               for (i = 1; i <= 5; i++)
                                   message2 = message2 + results[0][i] + ", "
                               mod1.value = message2
                               mod1.footer= newName2
                      }      
                      mod1.toggle()
               }
        }else{
            NSB.MsgBox("Problem adding to the database.")
        }
    } else {
        NSB.MsgBox("Error: " + req1.status)
    }  
}
