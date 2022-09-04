function openmess(){

    document.getElementById('popmes').style.height='390px';
}
function closemess(){

    document.getElementById('popmes').style.height='0px';
}
console.log('hello')


  async function postproject(e){
    event.preventDefault();
    var body = new FormData(document.forms.projectff)

console.log(body.get('projectname'))
   const resp=await fetch('http://localhost:3000/projectpost', {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:body.get('projectname'),
        team:body.get('projectteam'),
        mode:body.get('mode')}),
        Cache: 'default'
      })
      var resda=await resp.json();
      console.log(resda._id)
      if(resda){
document.getElementById('skillpp').style.display='block';
document.getElementById('proid').value=resda._id;
      }
  }
  async function postskill(e){
    event.preventDefault();
    var body = new FormData(document.forms.skillpp)

console.log(body.get('skill'))
setTimeout(()=>{
    document.getElementById('skillst').innerText="Skill Add Success";
    document.getElementById('skillpp').style.display='none';
}, 10000)

   const resp=await fetch('http://localhost:3000/skillpost', {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({projectid:body.get('projectid'),skill:body.get('skill'),
        }),
        Cache: 'default'
      })
      
     
  }

  async function skillpostoption(e){
    event.preventDefault();
    var body = new FormData(document.forms.projectff1)

console.log(body.get('skill'))
   const resp=await fetch('http://localhost:3000/quesskill', {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({skill:body.get('skill'),
        correct:body.get('correct')}),
        Cache: 'default'
      })
      var resda=await resp.json();
      console.log(resda._id)
      if(resda){
        document.getElementById('proid1').value=resda._id;
document.getElementById('skillpp1').style.display='block';

      }
  }

  async function postskill(e){
    event.preventDefault();
    var body = new FormData(document.forms.skillpp1)
document.getElementById('mnnd').innerText='Question Inserted'
console.log(body.get('question'))
setTimeout(()=>{
    document.getElementById('skillst').innerText="Skill Add Success";
    document.getElementById('skillpp').style.display='none';
}, 10000)

   const resp=await fetch('http://localhost:3000/quespost', {
        method: 'POST',
        headers: {
          Accept: 'application.json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({skillid:body.get('skillid'),option1:body.get('option1'),
        option2:body.get('option2'),
        option3:body.get('option3'),
        option4:body.get('option4'),
        question:body.get('question'),
        correct:body.get('correct'),
        }),
        Cache: 'default'
      })
      
     
  }

  var sum=0;
  function checkans(e){
    event.preventDefault()
    var body = new FormData(document.forms.nmb);
    console.log(body)
    var a=body.get('flexRadioDefault'+e)
    var b=body.get('correct'+e)
    console.log(a,b)
    if(a==b){
      sum +=50
      document.getElementById('answ'+e).innerText='Answer is Correct'
   
    }else{
      sum+=0
      document.getElementById('answ'+e).innerText='Answer is Wrong'
    }
    if(sum>=80){
      document.getElementById('dfg').style.display='block'
    }else{
      document.getElementById('dfg').style.display='none'
    }
    console.log(sum)
  }