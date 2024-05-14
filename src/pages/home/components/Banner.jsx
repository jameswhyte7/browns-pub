import { Button, Typography } from "@material-tailwind/react";

function Banner() {
  return (
    <section className="header-banner h-96 w-full bg-yellow-50">
      <div className="flex flex-col justify-center h-full text-center lg:text-left">
        <Typography
          variant="h1"
          color="white"
          className="container mx-auto text-3xl md:text-4xl lg:text-5xl"
        >
          Where Every Bite is a Delight
        </Typography>
        <Typography color="white" variant="h4" className="container mx-auto">
          Discover Culinary Bliss: Where Every Bite Transforms into a Delightful
          Memory.
        </Typography>
        <div className="container mx-auto mt-10">
          <Button color="amber">
            <span>
              <a href="#sectionmenu">Order Now</a>
            </span>
          </Button>
        </div>
      </div>
    </section>

    // <section className="header-banner h-96 w-full bg-yellow-50">
    //   <div className="flex flex-col justify-center h-full">
    //     <Typography
    //       variant="h1"
    //       color="white"
    //       className="container mx-auto text-3xl md:text-4xl lg:text-5xl"
    //     >
    //       Where Every Bite is a Delight
    //     </Typography>
    //     <Typography
    //       color="white"
    //       variant="paragraph"
    //       className="container mx-auto"
    //     >
    //       Discover Culinary Bliss: Where Every Bite Transforms into a Delightful
    //       Memory.
    //     </Typography>
    //     <div className="container mx-auto mt-10">
    //       <Button color="amber">
    //         <span>
    //           <a href="#sectionmenu">Order Now</a>
    //         </span>
    //       </Button>
    //     </div>
    //   </div>
    // </section>
  );
}

export default Banner;
