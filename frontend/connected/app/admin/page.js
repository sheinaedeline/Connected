'use client';
import logo from "assets/Logo Expanded.png";
import profile from "assets/Profile Icon.png";
import search from "assets/carbon_search.png";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trendingProjects } from '/public/data.js';
import trading from "assets/Trading Background.png";
import Footer from '/components/Footer.js';
import Header from '/components/Header.js';
import axios from 'axios';
import { useUserData } from "context/context";
import { Pie } from 'react-chartjs-2';
// import { ArcElement, Chart } from 'chart.js';
import { ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


Chart.register(ArcElement);


const options = ['finance',  'investment banking', 'web development', 'manufacturing', 'HR', 'marketing', 'retail', 'accounting'];


export default function Projects() {
    const [projectList, setProjectList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // GET project
    useEffect(() => {
        const getProject = async () => {
            const data = { 
                size: 5,
                page: 1
              };

            try {
                const response = await axios.post(`http://127.0.0.1:3000/project/getProjects`, data);
    
                // Dispatch
                console.log('View Profile Successful', response.data);
                setProjectList(response.data.content.projectsList);
                // Set variable states
                
            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('View Profile failed', error);
            }

            
        };

        getProject();
    }, []);

    useEffect(() => {
        setFilteredProjectList(projectList);
    }, [projectList]);

    const [searchInput, setSearchInput] = useState("");
    const [filteredProjectList, setFilteredProjectList] = useState([]);
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault(); // Prevent page refresh
    
        if (searchInput.trim() === '') {
            // If search bar is empty, show all projects
            setFilteredProjectList(projectList);
        } else {
            // Filter projects based on search input
            const filteredProjects = projectList.filter(item => item.project_title.toLowerCase().includes(searchInput.toLowerCase()));
    
            // Update filtered project list with filtered projects
            setFilteredProjectList(filteredProjects);
        }
    };

    function Filter() {
        const [showFilter, setShowFilter] = useState(false);
      
        const handleCheckboxChange = (option) => {
            setSelectedOptions(prevState => {
                if(prevState.includes(option)) {
                    return prevState.filter(opt => opt !== option);
                } else {
                    return [...prevState, option];
                }
            });
        };
      
        return (
            <div>
                <button 
                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" 
                onClick={() => setShowFilter(!showFilter)}>
                    Toggle Filter
                </button>
                {showFilter && (
                    <div 
                    className="ml-2 py-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        <h2>Filter</h2>
                        {options.map((option, index) => (
                            <div key={index}>
                                <input 
                                    type="checkbox" 
                                    id={`option-${index}`} 
                                    name={`option-${index}`} 
                                    value={option}
                                    onChange={() => handleCheckboxChange(option)}
                                    checked={selectedOptions.includes(option)}
                                />
                                <label htmlFor={`option-${index}`}>{option}</label>
                            </div>
                        ))}
                        <h2>Selected Options</h2>
                        {selectedOptions.map((option, index) => (
                            <p key={index}>{option}</p>
                        ))}
                    </div>
                )}
            </div>
        );
      }
    
    // Process the data for the chart
    let tagCounts = {};
    for (let project of projectList) {
        let tags = project.tags || [];
        for (let tag of tags) {
            if (tag in tagCounts) {
                tagCounts[tag]++;
            } else {
                tagCounts[tag] = 1;
            }
        }
    }
    
    // Create the chart data
    let chartData = Object.entries(tagCounts).map(([tag, count]) => ({ name: tag, value: count }));  

    // Generate an array of random colors
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
    const backgroundColor = chartData.map(() => randomColor());


    let yearCounts = {};
    for (let project of projectList) {
        if (project.end_date) {
            let endDate = new Date(project.end_date);
            let year = endDate.getFullYear();
            if (year in yearCounts) {
                yearCounts[year]++;
            } else {
                yearCounts[year] = 1;
            }
        }
    }

    
    let chartData2 = Object.entries(yearCounts).map(([year, count]) => ({ name: year, value: count }));
    console.log(projectList);

    let statusCounts = { new: 0, ongoing: 0, completed: 0 };
    let statusColors = { new: 'rgba(255, 99, 132, 0.2)', ongoing: 'rgba(75, 192, 192, 0.2)', completed: 'rgba(255, 206, 86, 0.2)' };
    let borderColor = { new: 'rgba(255, 99, 132, 1)', ongoing: 'rgba(75, 192, 192, 1)', completed: 'rgba(255, 206, 86, 1)' };

    for (let project of projectList) {
        if (project.status in statusCounts) {
            statusCounts[project.status]++;
        }
    }

    let chartData3 = Object.entries(statusCounts).map(([status, count]) => ({ 
        name: status, 
        value: count,
        color: statusColors[status],
        border: borderColor[status]
    }));

    console.log(chartData3);
    


    return (
        <div className="bg-white dark:bg-black">
            <Header/>

            <div className="flex flex-col justify-center px-32 items-center">
                <h2>Type spread</h2>
                <div style={{ height: '500px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Pie
                    data={{
                        labels: chartData.map(item => item.name),
                        datasets: [{
                            data: chartData.map(item => item.value),
                            backgroundColor: backgroundColor,
                        }]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                />
                </div>
                <div>
                    {chartData.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '20px', height: '20px', backgroundColor: backgroundColor[index] }}></div>
                            <p style={{ marginLeft: '10px' }}>{item.name}</p>
                        </div>
                    ))}
                </div>
                <br></br>
                <div style={{ height: '600px', width: '600px' }}>
                    <h2>Year spread</h2>
                    <Bar
                        data={{
                            labels: chartData2.map(item => item.name),
                            datasets: [{
                                label: 'Number of Projects',
                                data: chartData2.map(item => item.value),
                                backgroundColor: backgroundColor,
                                borderColor: backgroundColor,
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                }
                            }
                        }}
                    />
                    <h2> status spread</h2>
                    <Bar
                        data={{
                            labels: chartData3.map(item => item.name),
                            datasets: [{
                                label: 'Number of Projects',
                                data: chartData3.map(item => item.value),
                                backgroundColor: chartData3.map(item => item.color),
                                borderColor: chartData3.map(item => item.border),
                                borderWidth: 1
                            }]
                        }}
                        options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                }
                            }
                        }}
                    />
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}
