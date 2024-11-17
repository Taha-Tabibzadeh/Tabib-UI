/*

      Version: 1.0.1
       Author: Taha Tabibzadeh
      Website: https://tabibzadeh.com
         Docs: https://tabibzadeh.com/tabib-ui
      license: MIT license
 Release Date: 2024/05/11 | 1403/02/22

 */


//---------| Modal
 function My_modal(id,pick,w,title,drag,callback){

   const btn = document.querySelector(id);
   const pik = document.querySelector(pick);
   let Content;
 
   var Tabib_Content = "<div class='Tabib_Modal_head'>";
   Tabib_Content += "<span id='Tabib_Modal_close'>×</span>";
   Tabib_Content += "<span class='Tabib_Modal_title'>" + title +  "</span>";
   Tabib_Content += "</div>";
   Tabib_Content += "<div class='Tabib_Modal_content'></div>";
   
   let dlg = document.createElement("div");
   pik.classList.add("Tabib_Modal_Contain");
   dlg.classList.add("Tabib_Modal_Box");
   dlg.innerHTML = Tabib_Content
   
   const close = dlg.querySelector("#Tabib_Modal_close");
 
 
   btn.addEventListener('click', function(e) {
     
     if (callback && typeof callback === "function") {
       Content = callback();
     }
 
     if((window.innerWidth) < 900 ){
       dlg.closest(".Tabib_Modal_Box").style.width = "80%";
     }else{
       dlg.closest(".Tabib_Modal_Box").style.width = w;
     }
     
     dlg.querySelector(".Tabib_Modal_content").innerHTML = Content.innerHTML;
 
     pik.style.display = "block";
     pik.appendChild(dlg);
 
     setTimeout(function(){
       pik.classList.add("Tabib_Modal_Open");
     },300);  
 
     if(drag){
       DragModal(e);
     }
 
   });
   
   close.addEventListener('click', function(e) {
 
     pik.classList.remove("Tabib_Modal_Open");
     pik.innerHTML = "";
   //  dlg.style.top = "30%";
    // dlg.style.left = "50%";
     setTimeout(function(){
       pik.style.display = "none";
     },500);
 
   });

   //return this;
 
   function DragModal() {
    var modal = document.querySelector('.Tabib_Modal_Box');
    var modalBody = document.querySelector('.Tabib_Modal_head');

    let startX, startY, initialLeft, initialTop;

    const onMouseMove = (event) => {
        modalBody.style.cursor = 'all-scroll';
        
        const newX = initialLeft + (event.clientX - startX);
        const newY = initialTop + (event.clientY - startY);

        const width = dlg.offsetWidth;
        const height = dlg.offsetHeight;

        const minX = width/2; 
        const minY =  height/2; 
        const maxX = window.innerWidth - width/2;
        const maxY = window.innerHeight - height/2; 

        const boundedX = Math.min(Math.max(newX, minX), maxX);
        const boundedY = Math.min(Math.max(newY, minY), maxY);

        dlg.style.left = boundedX + 'px';
        dlg.style.top = boundedY + 'px';
    };

    const onMouseUp = () => {
        modalBody.style.cursor = 'default';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    modalBody.addEventListener('mousedown', (event) => {
        // Store initial positions when dragging starts
        startX = event.clientX;
        startY = event.clientY;

        const style = window.getComputedStyle(dlg);
        initialLeft = parseInt(style.left, 10);
        initialTop = parseInt(style.top, 10);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
  }

 
 }
 
 //---------| Notfication
 function Notif(id,title,txt,method){
 
   const btn = document.querySelector(id);
 
   // Make Parent div ------
   let Tabib_dlg = document.createElement("div");
   Tabib_dlg.classList.add("Tabib_Notif_Container");
   document.body.appendChild(Tabib_dlg);
 
   // Color -------
   var border;
   var icon_SVG;
   var icon_color;
 
   switch(method){
     case "success":
       border="4px solid #009d62";
       icon_color="style= background:#009d62;";
       icon_SVG="✓";
     break;
 
     case "warning":
       border="4px solid rgb(247,176,11)";
       icon_color="style= background:rgb(247,176,11);";
       icon_SVG="!";       
     break;
 
     case "error":
       border="4px solid rgb(244,73,73)";
       icon_color="style= background:rgb(244,73,73);";
       icon_SVG="×";     
     break;
 
     default:
       border="4px solid #5c91e3";
       icon_color="style= background:#5c91e3;";
       icon_SVG="i"; 
   }
 
 
   // insert message -------
   btn.addEventListener('click',function(){ 
 
     let Tabib_msg = document.createElement("div");
     Tabib_msg.classList.add("Tabib_Notif_box");
    
     var str = "<span class='Tabib_Notif_icon'" + icon_color + ">" + icon_SVG + "</span>";
     str += "<section>";
     str += "<div class='Tabib_Notif_title'>" + title + "</div>";
     str += "<div class='Tabib_Notif_txt'>" + txt + "</div>";
     str += "</section>";
 
     Tabib_msg.innerHTML = str;
     Tabib_msg.style.borderRight = border;
     
     var inject = document.querySelector(".Tabib_Notif_Container");
 
     // Show message
     inject.appendChild(Tabib_msg);
 
     setTimeout(() => {
      Tabib_msg.style.transform = "translateX(0px)";
     }, 30)
 
     setTimeout(() => {
      Tabib_msg.style.opacity = 0;
     }, 2700)
 
     setTimeout(() => {
      Tabib_msg.remove()
     }, 3000)
 
   });
 
 }
 
//---------| Multiple Select List
function MultiSelect(id,arr){

   const slct = document.querySelector(id);
   const options = slct.querySelectorAll("option");
   const group = slct.querySelectorAll("optgroup");
   const str_id = id.substring(1,id.length)
 
   const container = document.createElement('div');
   container.classList.add('Tabib_Mslct');
   slct.style.display = 'none';
   slct.parentNode.insertBefore(container, slct);
   container.appendChild(slct);
 
   //----Import Dom
 
   let Taha = "<span class='Tabib_Mslct_Drop' tabindex='0'></span>";
   Taha += "<ul class='Tabib_Mslct_list' ><input type='text' class='Drpd_search' placeholder='جست و جو کنید'/></ul>";
   container.insertAdjacentHTML('afterbegin',Taha);
   let list = container.querySelector(".Tabib_Mslct_list");
 
   if(group.length > 0){
 
   group.forEach((gr, index) =>{
       const list_title = "<li><span>" + gr.label + "</span></li>";
        list.insertAdjacentHTML('beforeend',list_title);
   
        options.forEach((item,num) =>{
   
          if(item.parentNode.label === gr.label){
          let opt = '<li>';
          opt += "<label for='" + str_id + "_" + index + "_" + num + "'>" + item.textContent + "</label>";
             opt += "<input id='" + str_id + "_" + index + "_" + num + "' type='checkbox' value='" + item.value + "'>";			 
          opt += "</li>";
             list.insertAdjacentHTML('beforeend',opt);
          }
        });
   });
   
     }else{
   
       options.forEach((item,num) =>{
         let opt = "<li>";
         opt += "<label for='" + str_id + "_" + num + "'>" + item.textContent +  "</label>";
         opt += "<input id='" + str_id + '_' + num + "' type='checkbox' value='" + item.value + "'>";
         opt += "</li>"
         list.insertAdjacentHTML('beforeend',opt);
       });
   }
 
   //----------------------Control
 
   let selectBtn = container.querySelector(".Tabib_Mslct_Drop");
   let items = container.querySelectorAll("li input[type='checkbox']");
   let inputElement = container.querySelector(".Drpd_search");
 
   selectBtn.innerText = "هیچ موردی انتخاب نشده است";
 
   selectBtn.addEventListener("click", (e) => {
       e.target.classList.toggle("open");
       inputElement.value = "";
   });


    document.addEventListener('click', (event) => {
      let taha = event.target;

      if (!taha.closest(".Tabib_Mslct_list") && taha !== selectBtn) {
        selectBtn.classList.remove('open');
      }
    });

 
   items.forEach(Tabib => {
    Tabib.addEventListener("click", () => {
        Tabib.classList.toggle("checked");
        const Tabib_value = Tabib.value;

        for (const option of slct.options) {

          if (Tabib_value == option.value) {
            if(option.selected == true){
              option.selected = false;
            }else{
              option.selected = true;
            } 
          }

        };

        const checked = container.querySelectorAll(".checked");

        if(checked && checked.length > 0){
          selectBtn.innerText = `${checked.length} مورد انتخاب شده است.`;
        }else{
          selectBtn.innerText = "هیچ موردی انتخاب نشده است";
        }
     });
   })
 
   //----------Check tick
 
   slct.selectedIndex = -1;
 
   if(arr != null){
     items.forEach(Tabib => {
       if (arr.includes(Tabib.value)) {
         Tabib.classList.add("checked");
         Tabib.checked = true;
       } else {
         Tabib.classList.remove("checked");
         Tabib.checked = false;
       }
     });
 
     for (const option of slct.options) {
       if (arr.includes(option.value)) {
         option.selected = true;
       }
     };
   }
 
   const checked = container.querySelectorAll(".checked");
   selectBtn.innerText = `${checked.length} مورد انتخاب شده است.`;
 
   //----------------------Search
 
   Multi_srch(inputElement);
   function Multi_srch(input){
     inputElement
     const rows = input.closest("ul").querySelectorAll("li");
 
     input.addEventListener("keyup", function() {
       var input = this.value.toLowerCase();
       var length = input.length;
 
       if (length >= 2) {
         for (var i = 0; i < rows.length; i++) {
           var text = rows[i].textContent.toLowerCase();
           if (text.indexOf(input) === -1) {
             rows[i].style.display = "none";
           } else {
             rows[i].style.display = "flex";
           }
         } 
       }else{
         for (var i = 0; i < rows.length; i++) {
           rows[i].style.display = "flex";
         }
       }
     });
   }
 
 }
 
//---------| Multiple Select Box
 function MultiBox(id,input_id,arr){

   const slct = document.querySelector(id);
   const opt = document.querySelector(input_id)
   opt.style.display = 'none';
   slct.classList.add('Tabib_Bslct');
 
   //----------------------Control
   let items = slct.querySelectorAll("input[type='checkbox']");
   opt.value = null;
   if(arr != null){
     items.forEach(Tabib => {
       if (arr.includes(Tabib.value)) {
        Tabib.classList.add("checked");
        Tabib.checked = true;
       } else {
        Tabib.classList.remove("checked");
        Tabib.checked = false;
       }
     });
     update_Mbox();
   }
 
   //----------------------update
 
   slct.addEventListener('click', (e) => {
     if (e.target.matches('label') || e.target.matches("input[type='checkbox']")){
       update_Mbox();
     }
   })
 
   //----------------------function
 
   function update_Mbox(e){
     data = [];
     items.forEach(Taha =>{
       if(Taha.checked){
         data.push(Taha.value);
       }
     }) 
     const taha = data.join(', ');
     opt.value = JSON.stringify(data);
   }
 }

 //--------| Add Tag to List

 function Tagin(id,all_tags,current_tags){

   const slct = document.querySelector(id);
   slct.style.display = "none";
 
   //--------------Add Dom
   const container = document.createElement('section');
   container.classList.add('Tabib_Tag_container');
   slct.parentNode.insertBefore(container, slct);
 
   let str = "<div class='Tabib_Tag_add'>";
       str += "<div class='Tabib_Tag_drp'>";
       str += "<span class='Tagin_slct' data='0'>انتخاب کنید</span>";
       str += "<ul style='display:none'>";
       str += "<input type='text' class='Drpd_search' placeholder='جست و جو کنید'/>";
       str += "</ul>";
       str += "</div>";
       str += "<input type='button' class='Tabib_Tag_btn' value='افزودن'>";
       str += "</div>";
       str += "<div class='Tabib_Tag_box'></div>";
 
   container.insertAdjacentHTML('afterbegin',str);
 
 
   //--------------Control
   const drp = container.querySelector('.Tagin_slct');
   const drp_ul = container.querySelector('.Tabib_Tag_drp ul');
 
   const btn = container.querySelector('.Tabib_Tag_btn');
   const box = container.querySelector('.Tabib_Tag_box');
   let data = [];
 
   drp.addEventListener('click', (e) => {
     if(drp_ul.style.display === "none"){
       drp_ul.style.display = "block";
     }else{
       drp_ul.style.display = "none";
     }
   })
 
   drp_ul.addEventListener('click', (e) => {
     if (e.target.matches('.Tabib_Tag_drp ul li')) {
       drp.innerHTML = e.target.textContent;
       drp.setAttribute('data', e.target.getAttribute('data'))
       drp_ul.style.display= "none";
     }
   })
 
   btn.addEventListener('click', (e) => {
     addtag();
   })
 
   document.addEventListener('click', (event) => {
    let taha = event.target;

    if (!taha.closest(".Tabib_Tag_drp ul") && taha !== drp) {
      drp_ul.style.display= "none";
    }
  });
 
   //--------------add array in json
 
   if(all_tags != null){
     all_tags.forEach(Taha => {
       const li = "<li data='" + Taha.id + "'>" + Taha.name + "</li>";
       drp_ul.insertAdjacentHTML('beforeend',li);
     })
   }
 
   if(current_tags != null){
     current_tags.forEach(Taha =>{
       let item = "<span class='Tabib_Tag_item'>";
           item += "<span>×</span>";
           item += "<text data='" + Taha.id + "'>" + Taha.name + "</text>";
           item += "</span>";
         
       box.insertAdjacentHTML('beforeend',item);
 
       container.removeEventListener('click', removeTag);
       container.addEventListener('click', removeTag);
       update_tag();
     })
   }
 
   //--------------function
   function addtag(e){
 
     const val =  container.querySelector('.Tagin_slct');
     const Tabib_val = val.innerHTML.trim();
     const get_data = val.getAttribute('data');
 
     if(!Tabib_val){return;}
     if(data.includes(get_data)){return;}
     if(get_data === '0'){return}
 
     let Tabibzadeh = "<span class='Tabib_Tag_item'>";
         Tabibzadeh += "<span>×</span>";
         Tabibzadeh += "<text data='" + get_data + "'>" + Tabib_val + "</text>";
         Tabibzadeh += "</span>";
       
     box.insertAdjacentHTML('beforeend',Tabibzadeh)
 
     container.removeEventListener('click', removeTag);
     container.addEventListener('click', removeTag);
     update_tag();
   }
 
   function removeTag(e) {
     if (e.target.matches('.Tabib_Tag_item span')) {
       e.target.parentNode.remove();
       update_tag();
     }
   }
 
   function update_tag(e){
     data = [];
     const Tabib = container.querySelectorAll('.Tabib_Tag_item text');
     Tabib.forEach(Taha =>{
       data.push(Taha.getAttribute('data'));
     }) 
 
     const taha = data.join(', ');
     slct.value = JSON.stringify(data);
   }
 
   //------------Search
   const input = container.querySelector(".Drpd_search");
   const rows = input.closest("ul").querySelectorAll("li");
 
   input.addEventListener("keyup", function() {
     var input = this.value.toLowerCase();
     var length = input.length;
 
     if (length >= 2) {
       for (var i = 0; i < rows.length; i++) {
         var text = rows[i].textContent.toLowerCase();
         if (text.indexOf(input) === -1) {
           rows[i].style.display = "none";
         } else {
           rows[i].style.display = "flex";
         }
       } 
     }else{
       for (var i = 0; i < rows.length; i++) {
         rows[i].style.display = "flex";
       }
     }
   });
   
 
 }
 
//--------| Hashtag

 function Hashtag(id,arr,placeholder){

   const tag_input = document.querySelector(id);
   tag_input.style.display = "none";
 
   const container = document.createElement('div');
   container.classList.add('Tabib_Hashtag_container');
   const inpt = document.createElement("INPUT");
   inpt.setAttribute('type', 'text');
   inpt.setAttribute('placeholder', placeholder);
   inpt.setAttribute('id', 'hash_' + id);
   container.appendChild(inpt);
   tag_input.parentNode.insertBefore(container, tag_input);
 
   inpt.addEventListener('keydown', (e) =>{
     let getUserInput = inpt.value;
     if(e.key === "Enter"){
       add_hash(getUserInput);
     }else{
       return false;
     }
   })
 
   container.addEventListener('click', (e) => {
     if(e.target.matches('.Tabib_Hash_item span')){
       e.target.parentNode.remove();
       update_hash();
     }
     inpt.focus();
   })
 
   //-----------
   if(arr != null){
     arr.forEach(Taha => {
       add_hash(Taha)
     })
   }
   //-----------
 
   function add_hash(str){
     let Tabib = "<span class='Tabib_Hash_item'>";
     Tabib += "<span>×</span>";
     Tabib += "<text>" + str + "</text>";
     Tabib += "</span>";
       
     inpt.insertAdjacentHTML('beforebegin',Tabib);
     inpt.value = "";
     update_hash();
   }
 
   function update_hash(e){
     data = [];
     arr = container.querySelectorAll('.Tabib_Hash_item text');
     arr.forEach(Taha =>{
       data.push(Taha.textContent);
     }) 
     //const taha = data.join(', ');
     tag_input.value = JSON.stringify(data);
   }
 
 }
 
 //--------| Atocomplete

 function AutoComp(id,info){

   const slct = document.querySelector(id);
   
   //---Import Dom
   const container = document.createElement('div');
   container.classList.add('Tabib_Atcm_container');
   slct.parentNode.insertBefore(container, slct);
 
   const Atcm_input = document.createElement('div');
   Atcm_input.classList.add('Tabib_Atcm_input');
   const Atcm_result = document.createElement('div');
   Atcm_result.classList.add('Tabib_Atcm_result');
   const Tabib = document.createElement('label');
   Tabib.innerHTML = "<svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-search'><circle cx='11' cy='11' r='8'></circle><line x1='21' y1='21' x2='16.65' y2='16.65'></line></svg>";
 
   Atcm_input.appendChild(slct);
   Atcm_input.appendChild(Tabib);
   container.appendChild(Atcm_input);
   container.appendChild(Atcm_result);
 
   //--Search in Data
 
   slct.onkeyup = function(){
     let result = [];
     let content = slct.value;
 
     if(content.length > 0){
       result = info.filter((Taha) => {
         return Taha.toLocaleLowerCase().includes(content.toLocaleLowerCase());
       });
     }
 
     display_Atcm(result);
 
     if(!result.length){
       Atcm_result.innerHTML = '';
     }
 
   }
  
   function display_Atcm(list){
     const content = list.map((k)=>{
       return "<li>" + k + "</li>";
     });
 
     Atcm_result.innerHTML = "<ul>" + content.join("") + "</ul>"
   }
 
    Atcm_result.addEventListener('click', (e) => {
      if(e.target.matches('li')){
        slct.value = e.target.innerHTML;
        Atcm_result.innerHTML = '';
      }
    })
 
 }
 

 //--------| Sortable List

function Sortable(selector,callback) {
		
	var list = document.querySelector(selector);
	var items = list.querySelectorAll("li");
	let src;
	
  items.forEach(tabib => {
    tabib.setAttribute("draggable", "true");

    tabib.addEventListener("dragstart", (e) => {
      tabib.classList.add("dragging");
		  src = e.target;
    });

    tabib.addEventListener("dragend", (e) => {
      tabib.classList.remove("dragging");
	
		  if (callback && typeof callback === "function") {
        callback();
      }		
    });
	
    tabib.addEventListener("dragover", Tabib_item);
  });

  function Tabib_item(e){

		e.preventDefault();
		
		const target = e.currentTarget;
		const targetIdx = Array.from(target.parentNode.children).indexOf(target);
		const srcIdx = Array.from(src.parentNode.children).indexOf(src);
		
		if(src && target && src !== target){
			if(targetIdx > srcIdx){	
				target.parentNode.insertBefore(src,target.nextSibling);
			}else{
				target.parentNode.insertBefore(src,target);
			}
		}	
  }

}

 //--------| Drag Move

function Drag_Move(Drag,Drop,callback) {

   var card = document.querySelector(Drag);
   var Box = document.querySelectorAll(Drop);
   let src;
   //------------
   
   card.querySelectorAll("li").forEach(Tabib => {
      Tabib.setAttribute("draggable", "true");
      
      Tabib.addEventListener('dragstart', function(e) {
        Tabib.classList.add("dragging");
         src = e.target;
       });
      
       Tabib.addEventListener('dragend', function(e) {
        Tabib.classList.remove("dragging");
         if (callback && typeof callback === "function") {
               callback();
           }
       });	
   
       Tabib.addEventListener("dragover", Tabib_item);
   });
   
   //------------
   
   Box.forEach(Tabib => {
   
    Tabib.addEventListener("dragover", (e)  => {	
   
         if(!src){return;}
         if (Tabib.querySelectorAll('li').length === 0) {
          Tabib.appendChild(src);
         }	
      });
   
      Tabib.addEventListener("dragleave", (e) => {
         e.preventDefault();
      });
   
   });
   
   //------------
   
   function Tabib_item(e){
      
      e.preventDefault();
      if(!src){return;}
   
      const target = e.currentTarget;
      const targetIdx = Array.from( e.currentTarget.parentNode.children).indexOf(target);
      const srcIdx = Array.from(src.parentNode.children).indexOf(src);
   
      const Taha_drag = document.querySelector('.dragging');
   
      const isSameList = Array.from(Box).some(container => container.contains(target.parentNode));
      
      const check = Taha_drag === src;
   
      console.log();
   
      if (isSameList && check) {
         if(src && target && src !== target){
            if(targetIdx > srcIdx){	
               target.parentNode.insertBefore(src,target.nextSibling);
            }else{
               target.parentNode.insertBefore(src,target);
            }			
         }
      }
   }
   
}

//--------| Drag Copy

function Drag_Copy(Drag,Drop,callback) {

   var task = document.querySelector(Drag);
   var Box = document.querySelectorAll(Drop);
   let copy_Node;
   let src;
   let src_parent;
   let Mode;
   
   task.querySelectorAll("li").forEach(Tabib => {
      Tabib.setAttribute("draggable", "true");
      
      Tabib.addEventListener('dragstart', function(e) {
         copy_Node = null;
         copy_Node = Tabib.cloneNode(true);
         copy_Node.classList.add("dragging");
         copy_Node.classList.add('Tabibzadeh');
   
         copy_Node.addEventListener("dragover", Tabib_item);
         copy_Node.addEventListener("dragstart", starty);
         copy_Node.addEventListener("dragend", endy);
   
         src = copy_Node;
         Mode = true;
         src_parent = Tabib.parentNode;
         Tabib.classList.add('dragging');
         Tabib.classList.add('Tabibzadeh');
       });
      
       Tabib.addEventListener('dragend', function(e) {
         copy_Node.classList.remove("dragging");
         Tabib.classList.remove('dragging');
   
         copy_Node = null;
         if (callback && typeof callback === "function") {
               callback();
           }
   
      });
      
   });
   
   //------------
   
   Box.forEach(Tabib => {
   
      Tabib.addEventListener("dragover", (e)  => {
         const current_drag = document.querySelector('.dragging');
         const isSameList = current_drag.classList.contains('Tabibzadeh');
         if (isSameList) {
            if (Tabib.querySelectorAll('li').length === 0) {
               Tabib.appendChild(src);
            }
         }		
      });
   
   });
   
   //------------
   
   function Tabib_item(e){
      
      e.preventDefault();
      
      const target = e.currentTarget;
      const targetIdx = Array.from( e.currentTarget.parentNode.children).indexOf(target);
   
      if(Mode){
         srcIdx = 0
      }else{	
         srcIdx = Array.from(src.parentNode.children).indexOf(src);
      }
   
      const isSameList = Array.from(Box).some(container => container.contains(target.parentNode));
      
      const Taha_drag = document.querySelector('.dragging');
      const check = Taha_drag.classList.contains('Tabibzadeh');
   
      if (isSameList && check) {
         if(src && target && src !== target){
            if(targetIdx > srcIdx){	
               target.parentNode.insertBefore(src,target.nextSibling);
            }else{
               target.parentNode.insertBefore(src,target);
            }			
         }
      }
   }
   
   function starty(e){
      e.target.classList.add("dragging");
      src = e.target;
      Mode = false;
      
   }
   
   function endy(e){
      e.target.classList.remove("dragging");
   }

   
}

//--------| Carousel

function Carousel(id, first_class, second_class){

  const slct = document.querySelectorAll(id);
  
  slct.forEach(function(element) {
    element.classList.add('Tabib_Carousel_Row');
    const Tabib_scroll = document.createElement('div');
    Tabib_scroll.classList.add('Tabib_Carousel');
    element.parentNode.insertBefore(Tabib_scroll, element);
    Tabib_scroll.appendChild(element);
  
    if(first_class != null){
      Tabib_scroll.classList.add(first_class);
    }
  
    if(second_class != null){
      Tabib_scroll.classList.add(second_class);
    }
  
    //-------|Variable|-------------------
    const list = Tabib_scroll.querySelectorAll(':scope > *');
    var isDown = false;
    var startX, startY, isScrolling;
    var scrollLeft;
    var touchStartTime;
    var touchStartX;
  
    //-------|Function|-------------------
  
    // Start Function (Mouse Down / Touch Start)
    function start(e) {
      e.preventDefault();
      isDown = true;
      Tabib_scroll.classList.add("active");
      Tabib_scroll.style.cursor = "move";
  
      if (e.type === 'mousedown') {
        startX = e.pageX - Tabib_scroll.offsetLeft;
      } else {
        touchStartTime = Date.now();
        touchStartX = e.touches[0].pageX;
        startX = touchStartX - Tabib_scroll.offsetLeft;
      }
      scrollLeft = Tabib_scroll.scrollLeft;
    }
  
    // Move Function (Mouse Move / Touch Move)
    function move(e) {
      if (!isDown) return;
      e.preventDefault();
      var x;
  
      if (e.type === 'mousemove') {
        x = e.pageX - Tabib_scroll.offsetLeft;
      } else {
        x = e.touches[0].pageX - Tabib_scroll.offsetLeft;
      }
  
      var walk = (x - startX) * 5;
      Tabib_scroll.scrollLeft = scrollLeft - walk;
      list.forEach(x => x.style.pointerEvents = "none");
    }
  
    // End Function (Mouse Up / Touch End / Touch Leave)
    function end(e) {
      isDown = false;
      Tabib_scroll.classList.remove("active");
      list.forEach(x => x.style.pointerEvents = "auto");
  
      if (e.type === 'touchend') {
        const touchDuration = Date.now() - touchStartTime;
        const touchEndX = e.changedTouches[0].pageX;
        const touchDistance = Math.abs(touchEndX - touchStartX);
  
        if (touchDuration < 300 && touchDistance < 10) {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          e.target.dispatchEvent(clickEvent);
        }
      }
    }
  
    // Mouse Events
    Tabib_scroll.addEventListener("mousedown", start);
    Tabib_scroll.addEventListener("mousemove", move);
    Tabib_scroll.addEventListener("mouseup", end);
    Tabib_scroll.addEventListener("mouseleave", end);
  
    // Touch Events
    Tabib_scroll.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - Tabib_scroll.offsetLeft;
      startY = e.touches[0].pageY - Tabib_scroll.offsetTop;
      scrollLeft = Tabib_scroll.scrollLeft;
    });
  
    Tabib_scroll.addEventListener('touchmove', (e) => {
      if (window.innerWidth <= 750) {
        const x = e.touches[0].pageX - Tabib_scroll.offsetLeft;
        const y = e.touches[0].pageY - Tabib_scroll.offsetTop;
        const walkX = (x - startX) * 2; 
        const walkY = Math.abs(y - startY);
  
        if (walkY < Math.abs(walkX)) {
          e.preventDefault();
          Tabib_scroll.scrollLeft = scrollLeft - walkX;
        }
      }
    });
  });

}
  

//--------| ProgressBar

function ProgressBar(btn,_time,percent){

   const trg = document.querySelector(btn);
   const num = document.querySelector('.Tabib-progress-num');
   let Tabib_id;

   if(percent !== ""){
      num.style.width = percent;
      num.innerHTML = percent;
   }

   trg.onclick = function(e){
      e.preventDefault();
      num.style.width = "0px";
      clearTimeout(Tabib_id);
      Tabib_id = null;

      var sec = _time; 
      var step = 100 / sec;
      var per = 0;

      Tabib_id = setInterval(function timer(){
         per += step;	
         if (per >= 100 ){
            per = 100;
            clearInterval(Tabib_id);
            Tabib_id = null;	
         }
         num.style.width = per + '%';
         num.innerHTML = Math.round(per,0) + " %";

      },1000);
   }

}
