"use strict";var $viewportButtons=$('.mobile-btn, .tablet-btn, .desktop-btn'),$customizerButton=$('.customizer-btn'),$productList=$('.products-list'),$body=$('body'),$productIframeWrapper=$('.main-frame'),$productIframe=$('.product-iframe');$.each($products,function(key,object){$productList.append('<li><a class="product" data-id="'+ key+'">'+ object.name+'<span class="badge">'+ object.tag+'</span></a><!--img class="img-preview" src="'+ object.img+'"/--></li>');});$('.buy').click(function(){if($current_product in $products){top.location.href=$products[$current_product]['purchase'];}
return false;});$('.customizer-btn').click(function(){if($current_product in $products){top.location.href='http://customizer.nyasha.me/#'+ $products[$current_product]['tooltip'];}
return false;});if(jQuery.browser.mobile){if($current_product in $products){top.location.href=$products[$current_product].url;}}
$('.remove-btn').click(function(){gotoProduct();return false;});if(window.innerWidth<960)gotoProduct();function gotoProduct(){if($current_product in $products){top.location.href=$products[$current_product].url;}}
function switcher_viewport_buttons(){if('undefined'!==typeof $products[$current_product].responsive&&$products[$current_product].responsive===0){$('.desktop-btn').get(0).click();$viewportButtons.addClass('disabled').removeClass('visible').css({'opacity':0,'visibility':'hidden'});}else{$viewportButtons.removeClass('disabled').addClass('visible').css({'opacity':1,'visibility':'visible'});}}
function customizer_button(){if('undefined'!==typeof $products[$current_product].customizer&&$products[$current_product].customizer===0){$customizerButton.addClass('disabled').removeClass('visible').css({'opacity':0,'visibility':'hidden'});}else{$customizerButton.removeClass('disabled').addClass('visible').css({'opacity':1,'visibility':'visible'});}}
$('.product-switcher > a').on('click',function(){$body.toggleClass('toggle');return false;});$productIframe.load(function(){$('.loader-inner, .preloading-icon').fadeOut(400);});$(document).ready(function(){$current_product=location.hash.replace('#','').split('?');$current_product=$current_product[0];if(!($current_product in $products)||$current_product===''){$current_product=location.search.replace('?product=','');if(!($current_product in $products)||$current_product===''){for(var key in $products)
if($products.hasOwnProperty(key))break;$current_product=key;}}
$('.product-switcher > a').html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width="16px" height="16px"> <g> <path d="M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z" fill="#ffffff"/> <path d="M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z" fill="#ffffff"/> <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z" fill="#ffffff"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg><span class="product-name">'+ $products[$current_product].tooltip+'</span>');$('title').text($products[$current_product].tooltip);$('.header-btn > a .price').text($products[$current_product].price);switcher_viewport_buttons();customizer_button();$productIframe.attr('src',$products[$current_product].url);$(".product-switcher .products-list").on({mouseenter:function(e){},mouseleave:function(e){}});});$('.product').click(function(){$current_product=$(this).data('id');if($current_product in $products){$body.toggleClass('toggle');$('.loader-inner, .preloading-icon').fadeIn(400);$productIframe.load(function(){$('.loader-inner, .preloading-icon').fadeOut(400);});$('.product-switcher > a').html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve" width="16px" height="16px"> <g> <path d="M30,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S25.589,16,30,16z" fill="#ffffff"/> <path d="M30,44c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,44,30,44z" fill="#ffffff"/> <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z" fill="#ffffff"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg><span class="product-name"><span class="product-name">'+ $products[$current_product].tooltip+'</span>');$('title').text($products[$current_product].tooltip);$('.header-btn > a .price').text($products[$current_product].price);$productIframe.attr('src',$products[$current_product].url);location.hash='#'+ $current_product;}
switcher_viewport_buttons();customizer_button();return false;});