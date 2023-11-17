'use client';
import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import Link from 'next/link';
import axios from 'axios';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
};

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  if (isNaN(date)) {
    return 'Invalid Date';
  }
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export default function ProjectTabs({accountId, userType}) {
    const [projectsList, setProjectsList] = useState({New: [], Ongoing: [], Old: []});

    useEffect(() => {
        const getProjects = async () => {
            const queryData = {
                size: 5,
                page: 1,
            };

            if (userType === 'company') {
                queryData['companyId'] = accountId;
            } else if (userType === 'professional') {
                queryData['userId'] = accountId;
            }

            const newQuery = {...queryData, 'status': "new"};
            const ongoingQuery = {...queryData, 'status': "ongoing"};
            const oldQuery = {...queryData, 'status': "old"};
            
            try {
                const newProjList = await axios.post('http://127.0.0.1:3000/project/getProjects', newQuery);
                const ongoingProjList = await axios.post('http://127.0.0.1:3000/project/getProjects', ongoingQuery);
                const oldProjList = await axios.post('http://127.0.0.1:3000/project/getProjects', oldQuery);
    
                const finalProjList = {
                    New: newProjList.data.content.projectsList, 
                    Ongoing: ongoingProjList.data.content.projectsList,
                    Old: oldProjList.data.content.projectsList
                }

                console.log("final", finalProjList);

                setProjectsList(finalProjList);

            } catch (error) {
                // Handle any errors (e.g., display an error message)
                console.error('Get Projects failed', error);
                alert('Get Projects failed');
            }
        };

        getProjects();
    }, []);

  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(projectsList).map((projectType) => (
            <Tab
              key={projectType}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-md font-medium leading-5 text-blue-900',
                  'ring-white/60 ring-offset-2 ring-offset-blue-400',
                  selected
                    ? 'bg-white shadow ring-2'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {projectType} Projects
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(projectsList).map((projects, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-blue-50 p-3',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul className='flex flex-col gap-4'>
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="relative rounded-md p-3 bg-white shadow ring-2 hover:bg-gray-100 hover:ring-blue-500"
                  >
                    <div className="flex justify-between space-x-1 leading-5">
                      <h2 className="text-md font-medium leading-5">{project.project_title}</h2>
                      <p className="text-sm text-right text-blue-900">{project.owner.userName} company</p>
                    </div>

                    <p className="mt-1 space-x-1 text-xs italic font-normal leading-4 text-gray-500">{formatDate(project.start_date)} - {formatDate(project.end_date)}</p>

                    <ul className="mt-1 flex space-x-1 justify-between text-xs font-normal leading-4">
                      <li>{project.description}</li>
                      <li>{project.skills}</li>
                    </ul>

                    <ul className="mt-1 flex space-x-1 text-xs font-medium leading-4 text-gray-500">
                      <li>{project.No_professional} professionals</li>
                      <li>&middot;</li>
                      <li>{project.price_budget}</li>
                      <li>&middot;</li>
                      <li>{project.expected_working_hours} hours</li>
                    </ul>

                    <Link
                      href={`/project/${project.id}`}
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
