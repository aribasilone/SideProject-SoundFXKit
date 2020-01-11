window.onload = function load() {
    window.addEventListener('keydown', keyFunct);
    
    var data ={
        'A': { name: 'Ding', soundClip: 'resources/ding.mp3'},
        'S': { name: 'Cuckcoo', soundClip:'resources/cuckoo.mp3'},
        'D': { name: 'Dun Dun Dun', soundClip:'resources/dun.mp3'},
        'F': { name:'Ticking', soundClip: 'resources/ticking.mp3'},
    }

    var divKit = document.getElementById("kit");
   
    for (var v in data){
        var divTemp = document.createElement('div');
        divTemp.classList.add('kitItem')

        var hTemp = document.createElement('h2');
        hTemp.textContent = v;

        var spanTemp = document.createElement('span');
        spanTemp.textContent = data[v].name;
        
        divTemp.appendChild(hTemp);
        divTemp.appendChild(spanTemp);        
        divKit.appendChild(divTemp);
                 
        data[v].el = divTemp;

        divTemp.addEventListener('click',function(event){
            var key = event.currentTarget.querySelector('h2').textContent;
            playFunct(key);
        })
    }

    var a = new Audio();
    var prevAudioAnim=data['A'];

    function playFunct(key){
        // var a = new Audio(); stop previous sound and animation
        a.pause();           
        prevAudioAnim.el.style.animation ='none';
        prevAudioAnim.el.style.webkitAnimation = 'none'; 
        prevAudioAnim.el.offsetHeight; /* triggers reflow to reset animation, do this or set timeout */  

        a.src = data[key].soundClip;

        setTimeout(function(){ //create time delay to address initial press delay in sound vs animation
            a.play();       

            switch(key){
                case 'A':
                    data[key].el.style.animation = 'kitItem-animation 2.2s';
                    data[key].el.style.webkitAnimation = 'kitItem-animation 2.2s';
                    break;
                
                case'S': 
                    data[key].el.style.animation = 'kitItem-animation 2.2s';
                    data[key].el.style.webkitAnimation = 'kitItem-animation 2.2s';
                    break;
                case 'D':
                    data[key].el.style.animation = 'kitItem-animation 4.5s';
                    data[key].el.style.webkitAnimation = 'kitItem-animation 4.5s';
                    break;
                default:
                    data[key].el.style.animation = 'kitItem-animation 4s';
                    data[key].el.style.webkitAnimation = 'kitItem-animation 4s';
            }
        
            data[key].el.addEventListener('animationEnd', removeFunct);
            data[key].el.addEventListener('webkitAnimationEnd', removeFunct);

        },250);

        prevAudioAnim=data[key];
    };

    function removeFunct(event){
        event.currentTarget.style.webkitAnimation = 'none';
        event.currentTarget.style.animation = 'none';
    }

    function keyFunct(event){
        playFunct(event.key.toUpperCase())
    };
    
}