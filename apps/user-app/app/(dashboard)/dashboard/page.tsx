import React from "react";
import Image from "next/image";
import pieChart from "../../img/pieChart.png";
import purple from "../../img/purple.png";
import yellow from "../../img/yellow.png";
import green from "../../img/green.png";
import blue from "../../img/blue.png";
// import Chart from "../../img/Chart 8.png";
import creditCard from "../../img/creditCard.png";
import Chart from "../../components/Chart";
export default function () {
  return (
    <div className="flex w-full ">
      <div className="border-2 border-gray-100 w-2/3">
        <div className="flex h-1/2">
          <div className="w-1/2">
            <Image src={pieChart} alt="Pie Chart" layout="responsive" />
          </div>
          <div className="pt-36 font-sans font-light">
            <div className=" flex gap-4 ">
              <div className="flex ">
                <Image src={purple} alt="purple" />
                <div>
                  <h4>Online Shoppping</h4>
                  <h4 className="text-center font-medium">$ 23032.0</h4>
                </div>
              </div>
              <div className="flex">
                <Image src={yellow} alt="yellow" />
                <div>
                  <h4>Entertainmnets</h4>
                  <h4 className="text-center font-medium">$ 23032.0</h4>
                </div>
              </div>
            </div>
            <div className=" flex gap-10 mt-10">
              <div className="flex">
                <Image src={green} alt="purple" />
                <div>
                  <h4>Car services</h4>
                  <h4 className="text-center font-medium">$ 23032.0</h4>
                </div>
              </div>
              <div className="flex ml-3">
                <Image src={blue} alt="yellow" />
                <div className="">
                  <h4>Households</h4>
                  <h4 className="text-center font-medium">$ 20007.30</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="" style={{ height: "320px", width: "100%" }}>
          <Chart></Chart>
        </div>
      </div>
      <div>
        <div>
          <Image src={creditCard} alt="credit Card"></Image>
        </div>
        <div>recent</div>
      </div>
    </div>
  );
}
