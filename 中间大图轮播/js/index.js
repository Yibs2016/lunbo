$(function(){

    var entrance = (function(){
        function scaleJump(opt){
            var setting = {
                mainBlock : $(".outer_wrap"),
                listSpeed : 500,
                maxH : 198.75,
                minH : 132.5,
                maxW : 300,
                minW : 200
            };
            var option = $.extend(setting,opt);
            var o_minW = option.minW,
            o_minW = option.minW,
            o_maxH = option.maxH,
            o_maxW = option.maxW,
            o_minH = option.minH,
            state = 0,
            o_main = option.mainBlock,
            o_arr = o_main.find(".arr"),
            o_arrl = o_main.find(".toleft"),
            o_arrr = o_main.find(".toright");
            var son = o_main.find("li"),
              o_rV = o_minW+o_maxW,
              o_midV = o_minW,
              o_midT = (o_minH-o_maxH)/2;
            var mid = parseInt(son.length / 2),
            i_on = mid,
            numL = mid,
            numR = son.length-mid-1;
            son.eq(mid).addClass("on");
            if(son.length < 3){return ;}
            for(var i = 0;i < son.length;i++){
              i < mid ? son.eq(i).css({"left":0,"top":0,"width":o_minW,"height":o_minH}) :0;
              i > mid ? son.eq(i).css({"left":o_rV,"top":0,"width":o_minW,"height":o_minH}) :0;
              i == mid ? son.eq(i).css({"left":o_midV,"top":o_midT,"width":o_maxW,"height":o_maxH}) :0;
              
            }

            //每次轮播重新定位li
            function reSetlocaton(mid){
                for(var i = 1;i<numL+1;i++){
                    son.eq(mid-i).css({"left":0,"top":0,"width":o_minW,"height":o_minH,"z-index":
                        (mid-i)})
                }
                for(var j = 1;j<numR+1;j++){
                    if(mid+j>son.length-1){
                    son.eq(mid+j-son.length).css({"left":o_rV,"top":0,"width":o_minW,"height":o_minH,"z-index":mid-j});
                    }else{
                    son.eq(mid+j).css({"left":o_rV,"top":0,"width":o_minW,"height":o_minH,"z-index":mid-j})
                    }
                }  
            }
            function setZ(){
                son.each(function (index,elem) {
                    if(index < mid){
                        $(elem).css({"z-index":index});
                    }else{
                        $(elem).css({"z-index":(son.length-index)})
                    }
                  
                })
            }
           setZ();
          o_arrl.css({'top':(o_minH-o_arrl.height())/2,'left':0})
          o_arrr.css({'top':(o_minH-o_arrr.height())/2,'right':0})

        function Go(){
            if(!son.is(":animated")){
            if(state){
                son.eq(i_on).removeClass('on').animate({"left":0,"top":0,"width":o_minW,"height":o_minH},600)
                son.eq(++i_on).addClass('on').animate({"left":o_midV,"top":o_midT,"width":o_maxW,"height":o_maxH},600); 
                    reSetlocaton(i_on);
                    if(i_on == son.length-1){i_on = -1;}
            }else{
                if( i_on == son.length){
                   son.eq(0).removeClass('on').animate({"left":o_rV,"top":0,"width":o_minW,"height":o_minH},600)
                }else{
                    son.eq(i_on).removeClass('on').animate({"left":o_rV,"top":0,"width":o_minW,"height":o_minH},600)   
                }
                son.eq(--i_on).addClass('on').animate({"left":o_midV,"top":o_midT,"width":o_maxW,"height":o_maxH},600); 
                    reSetlocaton(i_on);
                    if(i_on == 0){ i_on = son.length;
                            console.log(son.eq(i_on));
                       }
            }
            }else{
                return;
            }
        }

          o_arr.click(function(e){
            ;$(this).hasClass('toleft') && (state = 0,Go())
            ;$(this).hasClass('toright') && (state = 1,Go())
          })














        }
        return {
            scaleJump : scaleJump
        }



    })()


    entrance.scaleJump();
})