import Head from "next/head";
import Link from "next/link";

export default function page() {
  return (
    <div className="bg-white dark:bg-black">
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <h1 className="mb-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-3xl">
                ConnectEd
          </h1> 

          <br>
          </br>
          <div className="w-full pb-5 mx-auto text-left md:w-11/12">
            <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                Project 1
            </h1>
            <div className="max-w-xs bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                      2023-10-09 to 2023-10-10
                </h1>
            </div>
            <div className="max-w-4xl bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg">
                <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                      Project
                      <br>
                      </br>
                      Description 
                </h1>
            </div>

            <br></br>

            <h1 className="mb-3 text-5xl font-underline tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl">
                Professional
            </h1>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link1">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                      <p className="text-lg">Professional 1</p>
                      <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link2">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 2</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link3">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 3</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 4</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link5">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 5</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>

              <div className="p-3 text-gray-600 dark:text-gray-400">
                <a href="#link6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Professional 6</p>
                    <br />
                      <div className="rating" id="starRating">
                          <input type="radio" id="star5" name="rating" value="5" style={{ display: 'none' }} />
                          <label htmlFor="star5" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star4" name="rating" value="4" style={{ display: 'none' }} />
                          <label htmlFor="star4" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star3" name="rating" value="3" style={{ display: 'none' }} />
                          <label htmlFor="star3" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star2" name="rating" value="2" style={{ display: 'none' }} />
                          <label htmlFor="star2" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                          <input type="radio" id="star1" name="rating" value="1" style={{ display: 'none' }} />
                          <label htmlFor="star1" style={{ fontSize: '24px', padding: '5px', cursor: 'pointer' }}>&#9733;</label>
                      </div>
                  </div>
                </a>
              </div>
            </div>

            
  
          </div>
        </div>

        
        {/* <div
          style={{ backgroundImage: "url(/images/blur.png)" }}
          className="absolute inset-0 w-full h-full bg-bottom bg-no-repeat bg-cover -z-1"
        /> */}
      </section>
    </div>
  );
}
