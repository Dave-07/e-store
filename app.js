
/*PART1: slider and hover functionality*/

const wrapper = document.querySelector('.sliderWrapper');
const navBottomItems = document.querySelectorAll('.menuItem');
const sliderItems = document.querySelectorAll('.sliderItem');

let activeIndex;
let currentProduct;
const productsArr = [
    {
      id: 1,
      title: "Air Force",
      price: 6900,
      desc: "Дизайн модели Nike Air Force был создан еще в 70-х, но, кажется, с годами он становится еще более актуальным.",
      colors: [
        {
          code: "black",
          img: "./img/air.png",
        },
        {
          code: "darkblue",
          img: "./img/air2.png",
        },
      ],
    },
    {
      id: 2,
      title: "Air Jordan",
      price: 7500,
      desc: "Модель Nike Air Jordan, завоевавшая популярность на улицах благодаря своей классической простоте.",
      colors: [
        {
          code: "lightgray",
          img: "./img/jordan.png",
        },
        {
          code: "green",
          img: "./img/jordan2.png",
        },
      ],
    },
    {
      id: 3,
      title: "Blazer",
      price: 5800,
      desc: "Модели Blazer претендуют на звание самого минималистичного дизайна в коллекции бренда.",
      colors: [
        {
          code: "lightgray",
          img: "./img/blazer.png",
        },
        {
          code: "green",
          img: "./img/blazer2.png",
        },
      ],
    },
    {
      id: 4,
      title: "Crater",
      price: 4999,
      desc: "Прославившиеся за счет своего стиля и комфорта Nike Crater — это модель с обновленными деталями.",
      colors: [
        {
          code: "black",
          img: "./img/crater.png",
        },
        {
          code: "lightgray",
          img: "./img/crater2.png",
        },
      ],
    },
    {
      id: 5,
      title: "Hippie",
      price: 6200,
      desc: "Модель Hippie создана из прочного материала который хорошо пропускает воздух и создает особый комфорт.",
      colors: [
        {
          code: "gray",
          img: "./img/hippie.png",
        },
        {
          code: "black",
          img: "./img/hippie2.png",
        },
      ],
    },
  ];


navBottomItems.forEach((el, idx) => {

    /*custom functions*/
    function getColorProps(){
        let sliderBg = sliderItems[idx].querySelector('.sliderBg');
        let compStyle = getComputedStyle(sliderBg);
        let bgColor = compStyle.backgroundColor;
        return bgColor;
    }

    function setHoverColor(){
        navBottomItems[idx].style.color = getColorProps();
    }
    
    function removeHoverColor(){
        navBottomItems[idx].style.color = 'lightgray'; // Reset to default
    }

    function scrollX(){
        let setWidth = Number(idx.toString().padEnd(3, 0) || 100);
        wrapper.style.transform = `translateX(${-setWidth}vw)`;
    }

    function toggleActiveClass() {
        /*so the point is to remove active form all of them
        and set color to default gray and then only set active
        for the current index*/
        navBottomItems.forEach(el => {
            el.classList.remove('active');  
            el.style.color = 'lightgray';  
        });

        /*here setting the current element by adding active 
        and color to desired one while others above have set 
        to their default colors gray*/
        navBottomItems[idx].classList.add('active'); 
        navBottomItems[idx].style.color = getColorProps(); 
        activeIndex = idx;
    }

    function setProductDetails() {
        /*get all elemetns*/
        currentProduct = productsArr[idx];

        const selectors = [
            ".productTitle",
            ".productDesc",
            ".productPrice",
            ".productImg",
            ".colors",
            ".size"];

        const itemNodes = document.querySelectorAll(selectors.join(", "));
        const itemArr = Array.from(itemNodes);

        const [
            image,
            title,
            price,
            description,
            parentColor,
            ...sizes] = itemArr;

        const color1 = parentColor.children[0];
        const color2 = parentColor.children[1];

        /*set all elements*/
        image.setAttribute('src', currentProduct.colors[0].img);
        title.innerText = currentProduct.title;
        price.innerText = currentProduct.price + "₽";
        description.innerText = currentProduct.desc;
        color1.style.backgroundColor = currentProduct.colors[0].code;
        color2.style.backgroundColor = currentProduct.colors[1].code;
        
        return [itemArr, sizes];
    }

    function setColorsImg(){
       const itemArr = setProductDetails();
       const {0: img, 4: colors} =  itemArr[0];
       const colorsArr = [...colors.children];

       /*add eventList only once when index 0*/
        if (idx === 0) {
            colorsArr.forEach(el => {
                el.removeEventListener('click', handleClick);
                el.addEventListener('click', handleClick);
            });
        }
        
        /*handle different products data display via
        this handle function. Get a target product
        and set the props based on current product*/
        function handleClick(event){
            const targetBgColor = event.target.style.backgroundColor;
            const colors = productsArr[activeIndex ?? 0].colors;
            const mappingProps = colors.map(el => [el.code, el.img]);
            const objProps = Object.fromEntries(mappingProps);
            const imgLink = objProps[targetBgColor];
            img.setAttribute('src', imgLink);
        }
    }

    function setProductSize(){

        const arr = setProductDetails();
        const sizes = arr[1];

        /*check if current el == e.target
        aplly if condition otherwise for
        every el apply else condition*/
        function handleClick(e){
            sizes.forEach(el => {
                if (el.innerText === e.target.innerText){
                    el.style.backgroundColor = 'black';
                    el.style.color = 'whitesmoke';
                    
                }else{
                    el.style.backgroundColor = 'whitesmoke';
                    el.style.color = 'black';
                }
            });
        }

        sizes.forEach(el => {
            el.addEventListener('click', handleClick)
        });

    }

    function openPayment(){
        const buyBtn = document.querySelector('.productButton');
        const payModal = document.querySelector('.payment');

        function handleClick(){
            payModal.style.opacity = 1;
            payModal.style.visibility = 'visible';
        }

        buyBtn.addEventListener('click', handleClick);
    }

    function closePayment(){
        const closeBtn = document.querySelector('.close');
        const payModal = document.querySelector('.payment');

        function handleClick(){
            payModal.style.opacity = 0;
            payModal.style.visibility = 'hidden';
        }

        closeBtn.addEventListener('click', handleClick);
    }

    function checkoutPayment() {
        const checkoutBtn = document.querySelector('.payButton');

        function handleClick() {
            const inputs = document.querySelectorAll('.payInput');
            const inputsArr = Array.from(inputs);
            const payModal = document.querySelector('.payment');
        
            let checkInput = inputsArr.filter(el => el.value.trim().length === 0);
            let len = checkInput.length;

            if (len) {
                
                alert('Пожалуйста, введите всю информацию!');
                inputsArr.forEach(el => el.classList.add('special'));

            } else {
                alert('Спасибо за покупку!');

                inputsArr.forEach(el => {
                    el.value = "";
                    el.classList.remove('.special');
                });

                payModal.style.opacity = 0;
                payModal.style.visibility = 'hidden';
            }
        }

        checkoutBtn.addEventListener('click', handleClick);

    }

    /*event listeners*/
    el.addEventListener('click', function (e) {
        setProductDetails();
        setColorsImg();
        scrollX();
        toggleActiveClass();
        
    });

    el.addEventListener('mouseover', function (e) {
        setHoverColor();
    });

    el.addEventListener('mouseleave', function (e) {
        /*the point is all of the el have now this event
        and if el is != current el then on 
        mouseleave the color will reset. Allowing only 
        the current el to keep its color that was set
        by toggleActiveClass() func*/
        if (activeIndex !== idx) {
            removeHoverColor();
        }
    });

    document.addEventListener('DOMContentLoaded', function(e){
        if(idx === 0){
            setColorsImg();
            setProductSize();
            openPayment();
            closePayment();
            checkoutPayment();
        } 
    });

});









