/*
Copyright (c) 2009, www.redips.net All rights reserved.
Code licensed under the BSD License: http://www.redips.net/license/
http://www.redips.net/javascript/drag-and-drop-table-content/
version 2.7.1
Dec 1, 2010.
*/
"use strict";var REDIPS={};REDIPS.drag=(function(){var init,init_tables,enable_drag,img_onmousemove,handler_onmousedown,table_top,handler_onmouseup,handler_onmousemove,handler_onresize,set_trc,set_color,box_offset,calculate_cells,getScrollPosition,autoscrollX,autoscrollY,clone_object,clone_limit,elementControl,trash_delete,get_style,save_content,move_object,obj_margin=null,window_width=0,window_height=0,scroll_width=null,scroll_height=null,edge={page:{x:0,y:0},div:{x:0,y:0},flag:{x:0,y:0}},scroll_object,bgcolor_old=null,scrollable_container=[],tables=[],moved_flag=0,cloned_flag=0,cloned_id=[],currentCell=[],div_drag=null,div_box=null,table=null,table_old=null,table_source=null,row=null,row_old=null,row_source=null,cell=null,cell_old=null,cell_source=null,obj=false,obj_old=false,hover_color='#E7AB83',bound=25,speed=20,only={div:[],cname:'only',other:'deny'},mark={action:'deny',cname:'mark',exception:[]},border='solid',border_disabled='dotted',trash='trash',trash_ask=true,drop_option='multiple',delete_cloned=true,source_cell=null,current_cell=null,previous_cell=null,target_cell=null,clone_ctrlKey=false;init=function(dd){var self=this,i,imgs,evt,obj_new_div;if(dd===undefined){dd='drag';}
div_drag=document.getElementById(dd);if(!document.getElementById('obj_new')){obj_new_div=document.createElement('div');obj_new_div.id='obj_new';obj_new_div.style.width=obj_new_div.style.height='1px';div_drag.appendChild(obj_new_div);}
init_tables();handler_onresize();window.onresize=handler_onresize;enable_drag('init');imgs=div_drag.getElementsByTagName('img');for(i=0;i<imgs.length;i++){imgs[i].onmousemove=img_onmousemove;}
window.onscroll=calculate_cells;if(!Array.prototype.indexOf){Array.prototype.indexOf=function(el){var i;for(i=0;i<this.length;i++){if(this[i]===el){return i;}}
return-1;};}};init_tables=function(){var i,j,element,table_nested,tables_nodeList;tables_nodeList=div_drag.getElementsByTagName('table');for(i=0,j=0;i<tables_nodeList.length;i++){table_nested=true;element=tables_nodeList[i].parentNode;do{if(element.id===div_drag.id){table_nested=false;break;}
if(element.nodeName==='TABLE'){break;}
element=element.parentNode;}while(element);if(!table_nested){tables[j]=tables_nodeList[i];tables[j].idx=j;j++;}}};img_onmousemove=function(){return false;};handler_onmousedown=function(e){var evt=e||window.event,offset,mouseButton,position;if(elementControl(evt)){return true;}
REDIPS.drag.obj_old=obj_old=obj||this;REDIPS.drag.obj=obj=this;if(div_drag!==obj.redips_container){div_drag=obj.redips_container;init_tables();}
calculate_cells();if(obj.className.indexOf('clone')===-1){obj.style.zIndex=999;}
table_top(obj);set_trc(evt);table_source=table;row_source=row;cell_source=cell;REDIPS.drag.source_cell=source_cell=tables[table_source].rows[row_source].cells[cell_source];REDIPS.drag.current_cell=current_cell=source_cell;REDIPS.drag.previous_cell=previous_cell=source_cell;if(evt.which){mouseButton=evt.which;}
else{mouseButton=evt.button;}
if(mouseButton===1){moved_flag=0;cloned_flag=0;document.onmousemove=handler_onmousemove;document.onmouseup=handler_onmouseup;REDIPS.drag.myhandler_clicked();if(obj.setCapture){obj.setCapture();}}
if(table!==null||row!==null||cell!==null){bgcolor_old=tables[table].rows[row].cells[cell].style.backgroundColor;}
position=get_style(tables[table_source],'position');if(position!=='fixed'){position=get_style(tables[table_source].parentNode,'position');}
offset=box_offset(obj,position);obj_margin=[evt.clientY-offset[0],offset[1]-evt.clientX,offset[2]-evt.clientY,evt.clientX-offset[3]];div_drag.onselectstart=function(e){evt=e||window.event;if(!elementControl(evt)){if(evt.ctrlKey){document.selection.clear();}
return false;}};return false;};table_top=function(obj){var e,idx,tmp;e=obj.parentNode;while(e&&e.nodeName!=='TABLE'){e=e.parentNode;}
idx=tables.indexOf(e);if(idx!==0){tmp=tables[0];tables[0]=tables[idx];tables[idx]=tmp;}};handler_onmouseup=function(e){var evt=e||window.event,target_table,i,target_elements,target_elements_length;if(obj.releaseCapture){obj.releaseCapture();}
document.onmousemove=null;document.onmouseup=null;div_drag.onselectstart=null;obj.style.left=0;obj.style.top=0;obj.style.zIndex=10;obj.style.position='static';scroll_width=document.documentElement.scrollWidth;scroll_height=document.documentElement.scrollHeight;edge.flag.x=edge.flag.y=0;if(cloned_flag===1&&(table===null||row===null||cell===null)){obj.parentNode.removeChild(obj);cloned_id[obj_old.id]-=1;REDIPS.drag.myhandler_notcloned();}
else if(table===null||row===null||cell===null){REDIPS.drag.myhandler_notmoved();}
else{if(table<tables.length){target_table=tables[table];REDIPS.drag.target_cell=target_cell=target_table.rows[row].cells[cell];}
else if(table_old===null||row_old===null||cell_old===null){target_table=tables[table_source];REDIPS.drag.target_cell=target_cell=target_table.rows[row_source].cells[cell_source];}
else{target_table=tables[table_old];REDIPS.drag.target_cell=target_cell=target_table.rows[row_old].cells[cell_old];}
target_cell.style.backgroundColor=bgcolor_old;if(moved_flag===0){REDIPS.drag.myhandler_notmoved();target_cell.appendChild(obj);}
else if(cloned_flag===1&&table_source===table&&row_source===row&&cell_source===cell){obj.parentNode.removeChild(obj);cloned_id[obj_old.id]-=1;REDIPS.drag.myhandler_notcloned();}
else if(cloned_flag===1&&REDIPS.drag.delete_cloned===true&&(evt.clientX<target_table.offset[3]||evt.clientX>target_table.offset[1]||evt.clientY<target_table.offset[0]||evt.clientY>target_table.offset[2])){obj.parentNode.removeChild(obj);cloned_id[obj_old.id]-=1;REDIPS.drag.myhandler_notcloned();}
else if(target_cell.className.indexOf(REDIPS.drag.trash)>-1){obj.parentNode.removeChild(obj);if(REDIPS.drag.trash_ask){setTimeout(trash_delete,10);}
else{REDIPS.drag.myhandler_deleted();if(cloned_flag===1){clone_limit();}}}
else if(REDIPS.drag.drop_option==='switch'){obj.parentNode.removeChild(obj);target_elements=target_cell.getElementsByTagName('DIV');target_elements_length=target_elements.length;for(i=0;i<target_elements_length;i++){if(target_elements[0]!==undefined){source_cell.appendChild(target_elements[0]);}}
target_cell.appendChild(obj);if(target_elements_length){REDIPS.drag.myhandler_switched();REDIPS.drag.myhandler_dropped(target_cell);if(cloned_flag===1){clone_limit();}}
else{REDIPS.drag.myhandler_dropped(target_cell);if(cloned_flag===1){clone_limit();}}}
else if(REDIPS.drag.drop_option==='overwrite'){target_elements=target_cell.getElementsByTagName('DIV');target_elements_length=target_elements.length;for(i=0;i<target_elements_length;i++){target_cell.removeChild(target_elements[0]);}
target_cell.appendChild(obj);REDIPS.drag.myhandler_dropped(target_cell);if(cloned_flag===1){clone_limit();}}
else{target_cell.appendChild(obj);REDIPS.drag.myhandler_dropped(target_cell);if(cloned_flag===1){clone_limit();}}
if(table_source!==null&&row_source!==null){tables[table_source].rows[row_source].className=tables[table_source].rows[row_source].className;}
target_cell.parentNode.className=target_cell.parentNode.className;calculate_cells();}
table_old=row_old=cell_old=null;};handler_onmousemove=function(e){var evt=e||window.event,bound=REDIPS.drag.bound,sca,i,scrollPosition;if(moved_flag===0&&(obj.className.indexOf('clone')>-1||(REDIPS.drag.clone_ctrlKey===true&&evt.ctrlKey))){clone_object();cloned_flag=1;REDIPS.drag.myhandler_cloned();set_color();}
else if(moved_flag===0){REDIPS.drag.myhandler_moved();set_color();if(obj.setCapture){obj.setCapture();}
obj.style.position='fixed';}
moved_flag=1;if(evt.clientX>obj_margin[3]&&evt.clientX<window_width-obj_margin[1]){obj.style.left=(evt.clientX-obj_margin[3])+"px";}
if(evt.clientY>obj_margin[0]&&evt.clientY<window_height-obj_margin[2]){obj.style.top=(evt.clientY-obj_margin[0])+"px";}
if(evt.clientX<div_box[1]&&evt.clientX>div_box[3]&&evt.clientY<div_box[2]&&evt.clientY>div_box[0]&&(evt.clientX<currentCell[3]||evt.clientX>currentCell[1]||evt.clientY<currentCell[0]||evt.clientY>currentCell[2])){set_trc(evt);if(table<tables.length&&(table!==table_old||row!==row_old||cell!==cell_old)){if(table_old!==null&&row_old!==null&&cell_old!==null){tables[table_old].rows[row_old].cells[cell_old].style.backgroundColor=bgcolor_old;REDIPS.drag.previous_cell=previous_cell=tables[table_old].rows[row_old].cells[cell_old];REDIPS.drag.current_cell=current_cell=tables[table].rows[row].cells[cell];if(REDIPS.drag.drop_option==='switching'){move_object(current_cell,previous_cell);}
REDIPS.drag.myhandler_changed();calculate_cells();set_trc(evt);}
set_color();}}
edge.page.x=bound-(window_width/2>evt.clientX?evt.clientX-obj_margin[3]:window_width-evt.clientX-obj_margin[1]);if(edge.page.x>0){if(edge.page.x>bound){edge.page.x=bound;}
scrollPosition=getScrollPosition()[0];edge.page.x*=evt.clientX<window_width/2?-1:1;if(!((edge.page.x<0&&scrollPosition<=0)||(edge.page.x>0&&scrollPosition>=(scroll_width-window_width)))){if(edge.flag.x++===0){window.onscroll=null;autoscrollX(window);}}}
else{edge.page.x=0;}
edge.page.y=bound-(window_height/2>evt.clientY?evt.clientY-obj_margin[0]:window_height-evt.clientY-obj_margin[2]);if(edge.page.y>0){if(edge.page.y>bound){edge.page.y=bound;}
scrollPosition=getScrollPosition()[1];edge.page.y*=evt.clientY<window_height/2?-1:1;if(!((edge.page.y<0&&scrollPosition<=0)||(edge.page.y>0&&scrollPosition>=(scroll_height-window_height)))){if(edge.flag.y++===0){window.onscroll=null;autoscrollY(window);}}}
else{edge.page.y=0;}
for(i=0;i<scrollable_container.length;i++){sca=scrollable_container[i];if(evt.clientX<sca.offset[1]&&evt.clientX>sca.offset[3]&&evt.clientY<sca.offset[2]&&evt.clientY>sca.offset[0]){edge.div.x=bound-(sca.midstX>evt.clientX?evt.clientX-obj_margin[3]-sca.offset[3]:sca.offset[1]-evt.clientX-obj_margin[1]);if(edge.div.x>0){if(edge.div.x>bound){edge.div.x=bound;}
edge.div.x*=evt.clientX<sca.midstX?-1:1;if(edge.flag.x++===0){sca.div.onscroll=null;autoscrollX(sca.div);}}
else{edge.div.x=0;}
edge.div.y=bound-(sca.midstY>evt.clientY?evt.clientY-obj_margin[0]-sca.offset[0]:sca.offset[2]-evt.clientY-obj_margin[2]);if(edge.div.y>0){if(edge.div.y>bound){edge.div.y=bound;}
edge.div.y*=evt.clientY<sca.midstY?-1:1;if(edge.flag.y++===0){sca.div.onscroll=null;autoscrollY(sca.div);}}
else{edge.div.y=0;}
break;}
else{edge.div.x=edge.div.y=0;}}
evt.cancelBubble=true;if(evt.stopPropagation){evt.stopPropagation();}};handler_onresize=function(){if(typeof(window.innerWidth)==='number'){window_width=window.innerWidth;window_height=window.innerHeight;}
else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){window_width=document.documentElement.clientWidth;window_height=document.documentElement.clientHeight;}
else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){window_width=document.body.clientWidth;window_height=document.body.clientHeight;}
scroll_width=document.documentElement.scrollWidth;scroll_height=document.documentElement.scrollHeight;calculate_cells();};set_trc=function(evt){var cell_current,row_offset,cells,has_content,mark_found,only_found,single_cell,i;for(table=0;table<tables.length;table++){if(tables[table].offset[3]<evt.clientX&&evt.clientX<tables[table].offset[1]&&tables[table].offset[0]<evt.clientY&&evt.clientY<tables[table].offset[2]){row_offset=tables[table].row_offset;for(row=0;row<row_offset.length-1&&row_offset[row][0]<evt.clientY;row++){currentCell[0]=row_offset[row][0];currentCell[2]=row_offset[row+1][0];if(evt.clientY<=currentCell[2]){break;}}
if(row===row_offset.length-1){currentCell[0]=row_offset[row][0];currentCell[2]=tables[table].offset[2];}
do{cells=tables[table].rows[row].cells.length-1;for(cell=cells;cell>=0;cell--){currentCell[3]=row_offset[row][3]+tables[table].rows[row].cells[cell].offsetLeft;currentCell[1]=currentCell[3]+tables[table].rows[row].cells[cell].offsetWidth;if(currentCell[3]<=evt.clientX&&evt.clientX<=currentCell[1]){break;}}}
while(cell===-1&&row-->0);if(row<0||cell<0){table=table_old;row=row_old;cell=cell_old;}
cell_current=tables[table].rows[row].cells[cell];if(cell_current.className.indexOf(REDIPS.drag.trash)===-1){only_found=cell_current.className.indexOf(REDIPS.drag.only.cname)>-1?true:false;if(only_found===true){if(cell_current.className.indexOf(only.div[obj.id])===-1){if((table_old!==null&&row_old!==null&&cell_old!==null)){table=table_old;row=row_old;cell=cell_old;}
break;}}
else if(only.div[obj.id]!==undefined&&only.other==='deny'){if((table_old!==null&&row_old!==null&&cell_old!==null)){table=table_old;row=row_old;cell=cell_old;}
break;}
else{mark_found=cell_current.className.indexOf(REDIPS.drag.mark.cname)>-1?true:false;if((mark_found===true&&REDIPS.drag.mark.action==='deny')||(mark_found===false&&REDIPS.drag.mark.action==='allow')){if(cell_current.className.indexOf(mark.exception[obj.id])===-1){if((table_old!==null&&row_old!==null&&cell_old!==null)){table=table_old;row=row_old;cell=cell_old;}
break;}}}}
single_cell=cell_current.className.indexOf('single')>-1?true:false;if((REDIPS.drag.drop_option==='single'||single_cell)&&cell_current.childNodes.length>0){if(cell_current.childNodes.length===1&&cell_current.firstChild.nodeType===3){break;}
has_content=false;for(i=cell_current.childNodes.length-1;i>=0;i--){if(cell_current.childNodes[i].className&&cell_current.childNodes[i].className.indexOf('drag')>-1){has_content=true;break;}}
if(has_content&&table_old!==null&&row_old!==null&&cell_old!==null){if(table_source!==table||row_source!==row||cell_source!==cell){table=table_old;row=row_old;cell=cell_old;break;}}}
break;}}};set_color=function(){if(table<tables.length&&table!==null&&row!==null&&cell!==null){bgcolor_old=tables[table].rows[row].cells[cell].style.backgroundColor;tables[table].rows[row].cells[cell].style.backgroundColor=REDIPS.drag.hover_color;table_old=table;row_old=row;cell_old=cell;}};box_offset=function(box,position,box_scroll){var scrollPosition,oLeft=0,oTop=0,box_old=box;if(position!=='fixed'){scrollPosition=getScrollPosition();oLeft=0-scrollPosition[0];oTop=0-scrollPosition[1];}
if(box_scroll===undefined||box_scroll===true){do{oLeft+=box.offsetLeft-box.scrollLeft;oTop+=box.offsetTop-box.scrollTop;box=box.offsetParent;}
while(box&&box.nodeName!=='BODY');}
else{do{oLeft+=box.offsetLeft;oTop+=box.offsetTop;box=box.offsetParent;}
while(box&&box.nodeName!=='BODY');}
return[oTop,oLeft+box_old.offsetWidth,oTop+box_old.offsetHeight,oLeft];};calculate_cells=function(){var i,j,row_offset,position,cb;for(i=0;i<tables.length;i++){row_offset=[];position=get_style(tables[i],'position');if(position!=='fixed'){position=get_style(tables[i].parentNode,'position');}
for(j=tables[i].rows.length-1;j>=0;j--){row_offset[j]=box_offset(tables[i].rows[j],position);}
tables[i].offset=box_offset(tables[i],position);tables[i].row_offset=row_offset;}
div_box=box_offset(div_drag);for(i=0;i<scrollable_container.length;i++){position=get_style(scrollable_container[i].div,'position');cb=box_offset(scrollable_container[i].div,position,false);scrollable_container[i].offset=cb;scrollable_container[i].midstX=(cb[1]+cb[3])/2;scrollable_container[i].midstY=(cb[0]+cb[2])/2;}};getScrollPosition=function(){var scrollX,scrollY;if(typeof(window.pageYOffset)==='number'){scrollX=window.pageXOffset;scrollY=window.pageYOffset;}
else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){scrollX=document.body.scrollLeft;scrollY=document.body.scrollTop;}
else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){scrollX=document.documentElement.scrollLeft;scrollY=document.documentElement.scrollTop;}
else{scrollX=scrollY=0;}
return[scrollX,scrollY];};autoscrollX=function(so){var pos,old,scrollPosition,maxsp,edgeCrossed;if(typeof(so)==='object'){scroll_object=so;}
if(scroll_object===window){scrollPosition=old=getScrollPosition()[0];maxsp=scroll_width-window_width;edgeCrossed=edge.page.x;}
else{scrollPosition=scroll_object.scrollLeft;maxsp=scroll_object.scrollWidth-scroll_object.clientWidth;edgeCrossed=edge.div.x;}
if(edge.flag.x>0&&((edgeCrossed<0&&scrollPosition>0)||(edgeCrossed>0&&scrollPosition<maxsp))){if(scroll_object===window){window.scrollBy(edgeCrossed,0);scrollPosition=getScrollPosition()[0];pos=parseInt(obj.style.left,10);if(isNaN(pos)){pos=0;}}
else{scroll_object.scrollLeft+=edgeCrossed;}
setTimeout(REDIPS.drag.autoscrollX,REDIPS.drag.speed);}
else{calculate_cells();scroll_object.onscroll=calculate_cells;edge.flag.x=0;currentCell=[0,0,0,0];}};autoscrollY=function(so){var pos,old,scrollPosition,maxsp,edgeCrossed;if(typeof(so)==='object'){scroll_object=so;}
if(scroll_object===window){scrollPosition=old=getScrollPosition()[1];maxsp=scroll_height-window_height;edgeCrossed=edge.page.y;}
else{scrollPosition=scroll_object.scrollTop;maxsp=scroll_object.scrollHeight-scroll_object.clientHeight;edgeCrossed=edge.div.y;}
if(edge.flag.y>0&&((edgeCrossed<0&&scrollPosition>0)||(edgeCrossed>0&&scrollPosition<maxsp))){if(scroll_object===window){window.scrollBy(0,edgeCrossed);scrollPosition=getScrollPosition()[1];pos=parseInt(obj.style.top,10);if(isNaN(pos)){pos=0;}}
else{scroll_object.scrollTop+=edgeCrossed;}
setTimeout(REDIPS.drag.autoscrollY,REDIPS.drag.speed);}
else{calculate_cells();scroll_object.onscroll=calculate_cells;edge.flag.y=0;currentCell=[0,0,0,0];}};clone_object=function(){var obj_new=obj.cloneNode(true),offset,offset_dragged;document.getElementById('obj_new').appendChild(obj_new);if(obj_new.setCapture){obj_new.setCapture();}
obj_new.style.zIndex=999;obj_new.style.position='fixed';offset=box_offset(obj);offset_dragged=box_offset(obj_new);obj_new.style.top=(offset[0]-offset_dragged[0])+"px";obj_new.style.left=(offset[3]-offset_dragged[3])+"px";obj_new.onmousedown=handler_onmousedown;obj_new.className=obj_new.className.replace('clone','');if(cloned_id[obj.id]===undefined){cloned_id[obj.id]=0;}
obj_new.id=obj.id+'c'+cloned_id[obj.id];cloned_id[obj.id]+=1;obj_new.redips_container=obj.redips_container;obj_new.redips_enabled=obj.redips_enabled;REDIPS.drag.obj_old=obj_old=obj;REDIPS.drag.obj=obj=obj_new;};clone_limit=function(){var match_arr,limit_type,limit,classes;classes=obj_old.className;match_arr=classes.match(/climit(\d)_(\d+)/);if(match_arr!==null){limit_type=parseInt(match_arr[1],10);limit=parseInt(match_arr[2],10);limit-=1;classes=classes.replace(/climit\d_\d+/g,'');if(limit<=0){classes=classes.replace('clone','');if(limit_type===2){classes=classes.replace('drag','');obj_old.onmousedown=null;obj_old.style.cursor='auto';REDIPS.drag.myhandler_clonedend2();}
else{REDIPS.drag.myhandler_clonedend1();}}
else{classes=classes+' climit'+limit_type+'_'+limit;}
classes=classes.replace(/^\s+|\s+$/g,'').replace(/\s{2,}/g,' ');obj_old.className=classes;}};elementControl=function(evt){var formElement,srcName;if(evt.srcElement){srcName=evt.srcElement.tagName;}
else{srcName=evt.target.tagName;}
switch(srcName){case'A':case'INPUT':case'SELECT':case'OPTION':case'TEXTAREA':formElement=true;break;default:formElement=false;}
return formElement;};trash_delete=function(){var div_text='element',border;if(obj.className.indexOf('t1')>0){border='green';}
else if(obj.className.indexOf('t2')>0){border='blue';}
else{border='orange';}
if(obj.getElementsByTagName('INPUT').length||obj.getElementsByTagName('SELECT').length){div_text='form element';}
else if(obj.innerText||obj.textContent){div_text='"'+(obj.innerText||obj.textContent)+'"';}
if(confirm('Delete '+div_text+' ('+border+') from\n table '+table_source+', row '+row_source+' and column '+cell_source+'?')){REDIPS.drag.myhandler_deleted();if(cloned_flag===1){clone_limit();}}
else{if(cloned_flag!==1){tables[table_source].rows[row_source].cells[cell_source].appendChild(obj);calculate_cells();}
REDIPS.drag.myhandler_undeleted();}};enable_drag=function(enable_flag,div_id){var i,j,divs=[],borderStyle,cursor,handler,overflow,enabled,cb,position;if(enable_flag===true||enable_flag==='init'){handler=handler_onmousedown;borderStyle=REDIPS.drag.border;cursor='move';enabled=true;}
else{handler=null;borderStyle=REDIPS.drag.border_disabled;cursor='auto';enabled=false;}
if(div_id===undefined){divs=div_drag.getElementsByTagName('div');}
else{divs[0]=document.getElementById(div_id);}
for(i=0,j=0;i<divs.length;i=i+1){if(divs[i].className.indexOf('drag')>-1){divs[i].onmousedown=handler;divs[i].style.borderStyle=borderStyle;divs[i].style.cursor=cursor;divs[i].redips_enabled=enabled;divs[i].redips_container=div_drag;}
else if(enable_flag==='init'){overflow=get_style(divs[i],'overflow');if(overflow!=='visible'){divs[i].onscroll=calculate_cells;position=get_style(divs[i],'position');cb=box_offset(divs[i],position,false);scrollable_container[j]={div:divs[i],offset:cb,midstX:(cb[1]+cb[3])/2,midstY:(cb[0]+cb[2])/2};j++;}}}};get_style=function(el,style_name){var val;if(el.currentStyle){val=el.currentStyle[style_name];}
else if(window.getComputedStyle){val=document.defaultView.getComputedStyle(el,null).getPropertyValue(style_name);}
return val;};save_content=function(tbl){var query='',tbl_start,tbl_end,tbl_rows,cells,tbl_cell,t,r,c,d;tables.sort(function(a,b){return a.idx-b.idx;});if(tbl===undefined){tbl_start=0;tbl_end=tables.length-1;}
else if(tbl<0||tbl>tables.length-1){tbl_start=tbl_end=0;}
else{tbl_start=tbl_end=tbl;}
for(t=tbl_start;t<=tbl_end;t++){tbl_rows=tables[t].rows.length;for(r=0;r<tbl_rows;r++){cells=tables[t].rows[r].cells.length;for(c=0;c<cells;c++){tbl_cell=tables[t].rows[r].cells[c];if(tbl_cell.childNodes.length>0){for(d=0;d<tbl_cell.childNodes.length;d++){if(tbl_cell.childNodes[d].tagName==='DIV'){query+='p[]='+tbl_cell.childNodes[d].id+'_'+t+'_'+r+'_'+c+'&';}}}}}}
query=query.substring(0,query.length-1);return query;};move_object=function(from,to){var i,childnodes_length;if(from===to){return;}
childnodes_length=from.childNodes.length;for(i=0;i<childnodes_length;i++){to.appendChild(from.childNodes[0]);}};return{obj:obj,obj_old:obj_old,source_cell:source_cell,previous_cell:previous_cell,current_cell:current_cell,target_cell:target_cell,hover_color:hover_color,bound:bound,speed:speed,only:only,mark:mark,border:border,border_disabled:border_disabled,trash:trash,trash_ask:trash_ask,drop_option:drop_option,delete_cloned:delete_cloned,cloned_id:cloned_id,clone_ctrlKey:clone_ctrlKey,init:init,enable_drag:enable_drag,save_content:save_content,move_object:move_object,autoscrollX:autoscrollX,autoscrollY:autoscrollY,handler_onmousedown:handler_onmousedown,myhandler_clicked:function(){},myhandler_moved:function(){},myhandler_notmoved:function(){},myhandler_dropped:function(){},myhandler_switched:function(){},myhandler_changed:function(){},myhandler_cloned:function(){},myhandler_clonedend1:function(){},myhandler_clonedend2:function(){},myhandler_notcloned:function(){},myhandler_deleted:function(){},myhandler_undeleted:function(){}};}());