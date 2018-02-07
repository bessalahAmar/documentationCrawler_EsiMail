function myFunction() {
  
  //CONFIG
  var ENS_MOD = [['s_hassini@esi.dz','IHM'],['m_hadim@esi.dz','TPGO'],['c_yahiaoui@esi.dz','ANAD'],['s_ait_daoud@esi.dz','TSG'],['c_yahiaoui@esi.dz ','RES'] , ['s_ait_aoudia@esi.dz','COMPIL']];
  var Date_Before = "2018/2/6"; // yyyy/mm/dd
  var Date_After = "2017/10/1"; // yyyy/mm/dd
  var folderName = "SIQ2CS_S1";
  
  
  var folderP,folderMOD,folderTD,folderTP,folderCOUR,folderEXAMEN,folderOTHER;
  var labelName="TempLabel";
  var root = DriveApp.getRootFolder();
  folderP = DriveApp.createFolder(folderName);
  
  for(var i in ENS_MOD){
    
    folderMOD = folderP.createFolder(ENS_MOD[i][1]);
    
    folderCOUR = folderMOD.createFolder("COUR");
    folderTD = folderMOD.createFolder("TD");
    folderTP = folderMOD.createFolder("TP");
    folderEXAMEN = folderMOD.createFolder("EXAMEN");
    folderOTHER = folderMOD.createFolder("OTHER");
  
  var query = 'in:inbox from:('+ENS_MOD[i][0]+') has:nouserlabels filename:docx OR filename:jpg OR filename:pdf OR filename:rar OR filename:zip after:'+Date_After+' before:'+Date_Before;
    
  var threads = GmailApp.search(query);
  var label = getGmailLabel_(labelName);
  
  //
  for(var i in threads){
    var mesgs = threads[i].getMessages();
	for(var j in mesgs){
      
      var attachments = mesgs[j].getAttachments();
      for(var k in attachments){
        var attachment = attachments[k];
        
    	var attachmentBlob = attachment.copyBlob();
        var file = DriveApp.createFile(attachmentBlob);
        var nn = file.getName().toLowerCase();
          if(nn.indexOf("cour")>-1 || nn.indexOf("chapitre")>-1 || nn.indexOf("chap")>-1 ) { folderCOUR.addFile(file); }
          else if(nn.indexOf("td")>-1){ folderTD.addFile(file); }
          else if(nn.indexOf("tp")>-1){ folderTP.addFile(file); }
          else if(nn.indexOf("exam")>-1 || nn.indexOf("examen")>-1 || nn.indexOf("ci")>-1 || nn.indexOf("cf")>-1 || nn.indexOf("control")>-1 )
          { folderEXAMEN.addFile(file); }
          else { folderOTHER.addFile(file); }  
        root.removeFile(file);
      }
	}
	threads[i].addLabel(label);
  }
    
	label.deleteLabel()
  }
  
}



function getGmailLabel_(name){
  var label = GmailApp.getUserLabelByName(name);
  if(label == null){
	label = GmailApp.createLabel(name);
  }
  return label;
}
