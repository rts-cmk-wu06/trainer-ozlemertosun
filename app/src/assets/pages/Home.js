import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Stars from "../components/Stars";

const Home = () => {
  const [classes, setClasses] = useState([]);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("http://localhost:4000/api/v1/classes", { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          setClasses(res);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    let rng = Math.floor(Math.random() * classes.length);
    setNumber(rng);
  });

  return (
    <div className="margin">
      <Link to={`/class/${classes[number]?.id}`}>
        <div className="w-full h-[450px]">
          <div
            className="h-full w-full relative rounded-[25px] overflow-hidden"
            style={{
              backgroundImage: `url(${classes[number]?.asset?.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-curry absolute bottom-0 p-4 w-2/3 rounded-tr-[40px]">
              <div className="flex flex-col gap-2">
                <p className="semibold text-medium truncate">
                  {classes[number]?.className}
                </p>
                <div>
                  <Stars />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <section>
        <h2 className="bold text-big mb-4 mt-10">Classes for you</h2>
        <div className="flex gap-5 overflow-x-scroll overflow-hidden">
          {classes?.map((item, index) => (
            <Link to={`/class/${item.id}`} key={index}>
              <div
                className=" rounded-[25px] rounded-br-none overflow-hidden w-[150px] h-[170px] relative"
                style={{
                  backgroundImage: `url(${item.asset.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="bg-curry absolute z-10 w-full bottom-0 p-4 rounded-tr-[40px]  flex flex-col gap-1">
                  <p className="truncate semibold text-smallMedium">
                    {item.className}
                  </p>
                  <div>
                    <Stars />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
