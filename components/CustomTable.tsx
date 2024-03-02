"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { get, ref } from "firebase/database";
import { db } from "@/util/firebase";
import { PatientsProps } from "@/types/types";
import Image from "next/image";
import Pagination from "./Pagination";
import { useAppContext } from "@/context/AppContext";

function CustomTable() {
  const [info, setInfo] = useState<PatientsProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { perPage, searchTerm, sortBy } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let dataArray: PatientsProps[] = [];
        const appointmentsRef = ref(db, "appointments");
        const data = await get(appointmentsRef);
        data.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          const childId = childSnapshot.key;
          dataArray.push({ id: childId, ...childData });
        });

        // Sorting the data based on the selected sorting option
        dataArray.sort((a: PatientsProps, b: PatientsProps) => {
          switch (sortBy) {
            case "patient_name":
              return a.patient_name.localeCompare(b.patient_name);
            case "appointment_date":
              return (
                new Date(a.appointment_date).getTime() -
                new Date(b.appointment_date).getTime()
              );
            case "mobile_number":
              return a.mobile_number.localeCompare(b.mobile_number);
            case "doctor":
              return a.doctor.localeCompare(b.doctor);
            case "injury":
              return a.injury.localeCompare(b.injury);
            default:
              return 0;
          }
        });

        // Filtering/searching the data based on the search term
        const filteredData = dataArray.filter((item) =>
          item.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Update state with sorted and filtered data
        setInfo(filteredData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchTerm, perPage, sortBy]);

  // Logic for pagination
  const lastPostIndex = currentPage * perPage;
  const firstPostIndex = lastPostIndex - perPage;
  const currentPosts = info.slice(firstPostIndex, lastPostIndex);

  if (isLoading) {
    return (
      <h1 className="text-2xl text-center text-gray-400 font-bold w-full sm:px-6 lg:px-8">
        Loading...
      </h1>
    );
  } else if (searchTerm && info.length === 0) {
    return (
      <h1 className="text-2xl text-center text-gray-400 font-bold w-full sm:px-6 lg:px-8">
        No Record Found
      </h1>
    );
  } else {
    return (
      <>
        <Table className="p-4 w-full border shadow-lg">
          <TableHeader className="bg-gray-50 w-full">
            <TableRow>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PATIENTS
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                DATE
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                TIME
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                DOCTOR
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                INJURY
              </TableHead>
              <TableHead
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200 w-full">
            {currentPosts.map((person, index) => {
              // Convert the date string to a Date object
              const appointmentDate = new Date(person.appointment_date);

              // Format the date using toLocaleString with custom options
              const formattedDate = appointmentDate.toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <TableRow
                  key={person.id}
                  className={index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"}
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0  font-bold rounded-full text-center text-xl grid place-content-center h-10 w-10">
                        <Image
                          src={person?.patient_img}
                          alt="patient-image"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {person?.patient_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {person.mobile_number}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-2 justify-left items-center whitespace-nowrap">
                      <MdOutlineDateRange className="text-xl" />
                      <span>{formattedDate}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-2 justify-left items-center whitespace-nowrap">
                      <BsClockHistory className="text-xl" />
                      <span>{person.appointment_time}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex gap-2 justify-left items-center whitespace-nowrap">
                      <FaStar
                        className={
                          "rounded-full text-xl text-white p-1" +
                          (index % 2 === 0 ? " bg-orange-500" : " bg-green-500")
                        }
                      />
                      <span> {person.doctor}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-md bg-blue-100 text-sky-800">
                      {person.injury}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <HiOutlineDotsVertical />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Pagination
          totalPosts={info.length}
          postsPerPage={perPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </>
    );
  }
}

export default CustomTable;
