import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const todayPick = [
  {
    title: "김치찌개",
    img: "https://i.namu.wiki/i/8drgvI-cQLUfJDC00zbl2ZolK4W3o4ZkVSpR-zM5FZk_QzT58vYnx_7ohk0qwGYYiSLPiZgwccyIEFUtYKDjUQ.webp",
    kcal: "300"
  },
  {
    title: "비빔밥",
    img: "https://i.namu.wiki/i/dgjXU86ae29hDSCza-L0GZlFt3T9lRx1Ug9cKtqWSzMzs7Cd0CN2SzyLFEJcHVFviKcxAlIwxcllT9s2sck0RA.jpg",
    kcal: "300"
  },
  {
    title: "갈비찜",
    img: "https://i.namu.wiki/i/9xHkxjyIHj2yj9fFf7eeyK8YJE3Lu3gJpFEDpe8cNwuMl2hOm61RE7S6607J1KwdvvcejL2J2b2kdS6y_UL0JQ.webp",
    kcal: "300"
  },
  {
    title: "갈비찜",
    img: "https://i.namu.wiki/i/9xHkxjyIHj2yj9fFf7eeyK8YJE3Lu3gJpFEDpe8cNwuMl2hOm61RE7S6607J1KwdvvcejL2J2b2kdS6y_UL0JQ.webp",
    kcal: "300"
  },
  {
    title: "갈비찜",
    img: "https://i.namu.wiki/i/9xHkxjyIHj2yj9fFf7eeyK8YJE3Lu3gJpFEDpe8cNwuMl2hOm61RE7S6607J1KwdvvcejL2J2b2kdS6y_UL0JQ.webp",
    kcal: "300"
  },
  {
    title: "갈비찜",
    img: "https://i.namu.wiki/i/9xHkxjyIHj2yj9fFf7eeyK8YJE3Lu3gJpFEDpe8cNwuMl2hOm61RE7S6607J1KwdvvcejL2J2b2kdS6y_UL0JQ.webp",
    kcal: "300"
  },
];


const HomePage = ({deviceType}) => {
  return (
    <div id='container' className='flex flex-col items-center'>
      <div className="w-full max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center mt-10">
          핵꿀팁 BEST 요리모음 
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {todayPick.map((recipe, index) => (
            <div key={index} className="group relative overflow-hidden cursor-pointer">
              <div className="absolute top-2 left-2 bg-[#66BB6A] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-md">
                {index + 1}
              </div>
              <img
                src={recipe.img}
                alt={recipe.title}
                className="w-full h-52 object-cover"
              />
              <div className="absolute top-2 right-2 text-2xl cursor-pointer">
                ♡
              </div>
              <p className='text-sm mt-2 text-gray-500'>#해시태그</p>
              <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:underline">
                {recipe.title}
              </h3>
              <p className="text-sm text-gray-500">{recipe.kcal} kcal</p>
            </div>
          ))}
        </div>
       
      </div>
      <div className="mt-10 relative w-full h-[400px] overflow-hidden cursor-pointer">
        <img
          src={todayPick[0].img}
          alt="김치찌개"
          className="w-full h-full object-cover"
        />

        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-white p-6 shadow-lg max-w-sm">
          <p className="text-xs font-semibold text-gray-500 mb-1">한식</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">전통 김치찌개 레시피</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a velit vel leo aliquet tincidunt sit amet in nisi. Fusce suscipit rhoncus massa, et malesuada justo. Mauris posuere, ipsum nec sollicitudin malesuada, magna enim venenatis est, id pretium purus justo eget nisi. Fusce hendrerit lacus sit amet lectus pretium feugiat. 
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-20  mb-6 ">
        <h2 className="text-3xl font-bold mb-6 text-center">
          오늘은 이 레시피 어때요?
        </h2>
        <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            // autoPlay={deviceType !== "mobile"}
            // autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all 0.5s"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {todayPick.slice(0,4).map((recipe, index)=>(
              <div className='px-2'>
              <div className="relative overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
                <img
                  src={recipe.img}
                  alt={recipe.title}
                  className="w-full h-64 object-cover"
                  />
                <div className="absolute bottom-0 w-full h-full bg-black/50 text-white p-4">
                  <h3 className="text-lg font-bold">{recipe.title}</h3>
                  <div className="flex items-center text-sm mt-1 space-x-2">
                    <span>한식</span>
                    <span>338Kcal</span>
                    <span>30분</span>
                  </div>
                </div>
              </div>
            </div>
            ))}

          </Carousel>
      </div>


      <div className=" w-full px-4 py-10 mt-20 bg-[#F1F8E9]">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center hover:underline cursor-pointer">
          다이어트 중? 400kcal 이하 레시피!
          <a href="#" className="text-3xl text-[#66BB6A]">→</a>
        </h2>
        <div className="grid grid-cols-2 gap-6 px-4 max-w-7xl mx-auto">
          {todayPick.slice(0,4).map((recipe, index) => (
            <div key={index} className="relative overflow-hidden hover:scale-105 transition-transform bg-white cursor-pointer">
              <img
                src={recipe.img}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 text-2xl cursor-pointer">
                ♡
              </div>
              <div className="absolute bottom-0 w-full bg-black/50 text-white p-4">
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <div className="flex items-center text-sm mt-1">
                  <span>{recipe.category}</span>
                  <span>{recipe.kcal} kcal</span>
                  <span>{recipe.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
   
      </div>
  

    </div>
  )
}

export default HomePage;
