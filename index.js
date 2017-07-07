window.onload = function(){
  var $ = function(id){
    return document.getElementById(id);
  };
  var table = $('cartTable');
  var trs = table.children[1].rows;
  var checkInputs = document.getElementsByClassName('check');
  var checkAllInputs = document.getElementsByClassName('check-all');
  var selectedTotal = $('selectedAll');
  var priceTotal = $('priceTotal');
  var selected = $('selected');
  var foot = $('foot');
  var selectedViewList = $('selectedViewList');
  var deleteAll = $('deleteAll');
  var getTotal = function(){
    var selecteds = 0;
    var price = 0;
    var str = '';
    for(var i=0;i<trs.length;i++){
      if(trs[i].getElementsByTagName('input')[0].checked){
        trs[i].className = "on";
        selecteds += parseInt(trs[i].getElementsByTagName('input')[1].value);
        price += parseInt(trs[i].cells[4].innerHTML);
        str +='<div><img style="width: 50px;height: 50px" src="'+ trs[i].getElementsByTagName('img')[0].src +'"><span class="del" index="'+i+'">取消选择</span></div>';
      }else {
        trs[i].className = "";
      }
    }
      if(selecteds === 0){
        foot.className = 'foot';
      }

      selectedTotal.innerHTML = selecteds;
      priceTotal.innerHTML = price;
      selectedViewList.innerHTML = str;
    }
  for(var i=0;i<checkInputs.length;i++){
    checkInputs[i].onclick = function(){
      if(this.className == 'check-all check'){
        for(var j = 0; j<checkInputs.length;j++){
          checkInputs[j].checked = this.checked;
        }
      }
      if(this.checked == false){
          for(var x=0;x<checkAllInputs.length;x++){
            checkAllInputs[x].checked = false;
          }
      }
      getTotal();
    };
  }
  selected.onclick = function(){
    if(foot.className === "foot"){
      if(selectedTotal.innerHTML != 0){
        foot.className = 'foot show';
      }
    }else{
      foot.className = 'foot';
    }
  }
  selectedViewList.onclick = function(e){
    if(e.target.className === 'del'){
      var index = e.target.getAttribute('index');
      var input = trs[index].getElementsByTagName('input')[0];
      input.checked=false;
      input.onclick();
    }
  }
  for(var i=0;i<trs.length;i++){
    trs[i].onclick = function(e){
      var num = parseInt(this.cells[2].innerHTML);
      if(e.target.className === 'add'){
        this.cells[3].getElementsByTagName('span')[0].style.display = 'inline-block';
        this.cells[3].getElementsByTagName('input')[0].value++;
      }
      if(e.target.className === 'reduce'){
        this.cells[3].getElementsByTagName('input')[0].value--;
        if(this.cells[3].getElementsByTagName('input')[0].value == 0){
          this.cells[3].getElementsByTagName('span')[0].style.display = 'none';
        }
      }
      if(e.target.className === 'delete'){
        var conf = confirm('确定要删除吗？');
        if(conf === true){
          this.parentNode.removeChild(this);
        }
      }
      var sum =  this.cells[3].getElementsByTagName('input')[0].value*num;
      this.cells[4].innerHTML = sum;
      getTotal();
    }
  }
  deleteAll.onclick = function(){
    console.log(selectedTotal.innerHTML);
    if(selectedTotal.innerHTML != 0){
      var conf = confirm('确定要删除吗？');
      if(conf === true){
        for(var i=0;i<trs.length;i++){
          if(trs[i].getElementsByTagName('input')[0].checked){
            trs[i].parentNode.removeChild(trs[i]);
            i--;
          }
        }
      }
    }
  }
  checkAllInputs[0].checked = true;
  checkAllInputs[0].onclick();
}
