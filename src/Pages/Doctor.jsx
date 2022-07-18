import { useParams } from "react-router-dom";
import { Button, Input, Stack, Text, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Doctor() {
  const params = useParams();
  const [docData, setDocData] = useState({});
  const [hosList, setHoslist] = useState([]);

  const getdata = async () => {
    let res = await fetch(
      `https://hospital-doctor-json-server.herokuapp.com/doctor/${+params.id}`
    );
    let data = await res.json();

    let res1 = await fetch(
      "https://hospital-doctor-json-server.herokuapp.com/hospital"
    );
    let data1 = await res1.json();
    setDocData(data);
    setHoslist(data1);
  };

  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
      <Stack>
        <Input
          value={docData.docName}
          onChange={(e) => setDocData({ ...docData, docName: e.target.value })}
          placeholder="Name"
        />
        <Menu onChange={(e) => setDocData({ ...docData, docHos: e })}>
          <MenuButton textAlign="left" as={Button}>
            Hospital
          </MenuButton>
          <MenuList
            onChange={(e) =>
              setDocData({ ...docData, docSpec: e.target.value })
            }
          >
            {hosList.map((item) => (
              <MenuItem
                key={item}
                onClick={(e) =>
                  setDocData({ ...docData, docHos: item.hosName })
                }
              >
                {item.hosName}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Menu onChange={(e) => setDocData({ ...docData, docSpec: e })}>
          <MenuButton textAlign="left" as={Button}>
            Specialization
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={(e) =>
                setDocData({
                  ...docData,
                  docSpec: "General (Medicine)"
                })
              }
            >
              General (Medicine){" "}
            </MenuItem>
            <MenuItem
              onClick={(e) => setDocData({ ...docData, docSpec: "Neohrology" })}
            >
              Neohrology
            </MenuItem>
            <MenuItem
              onClick={(e) =>
                setDocData({ ...docData, docSpec: "Cardiologist" })
              }
            >
              Cardiologist
            </MenuItem>
            <MenuItem
              onClick={(e) =>
                setDocData({ ...docData, docSpec: "Radiologist" })
              }
            >
              Radiologist
            </MenuItem>
            <MenuItem
              onClick={(e) => setDocData({ ...docData, docSpec: "Dentist" })}
            >
              Dentist
            </MenuItem>
          </MenuList>
        </Menu>
        <Input
          value={docData.docSalary}
          onChange={(e) =>
            setDocData({ ...docData, docSalary: e.target.value })
          }
          placeholder="Salary"
          type="number"
        />
      </Stack>
    </>
  );
}
