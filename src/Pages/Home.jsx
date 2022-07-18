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
export function Home() {
  const [hosOpen, setHosOpen] = useState(false);
  const [docOpen, setDocOpen] = useState(false);
  const [hosData, setHosData] = useState({ hosName: "", hosAdd: "" });
  const [hosList, setHosList] = useState([]);
  const [ft, setFt] = useState(0);
  const [docList, setDocList] = useState([]);
  const [lt, setLt] = useState(0);

  const [docData, setDocData] = useState({
    docName: "",
    docHos: "",
    docSpec: "",
    docSalary: ""
  });
  const getHosList = async () => {
    let res = await fetch(
      "https://hospital-doctor-json-server.herokuapp.com/hospital"
    );
    let data = await res.json();
    setHosList(data);
    console.log(data);
  };

  const getDocList = async () => {
    let res = await fetch(
      "https://hospital-doctor-json-server.herokuapp.com/doctor"
    );
    let data = await res.json();
    setDocList(data);
  };
  console.log(docData);

  useEffect(() => {
    getDocList();
  }, [lt]);
  console.log(docList);
  useEffect(() => {
    getHosList();
  }, [ft]);
  const postHosData = async () => {
    let res = await fetch(
      "https://hospital-doctor-json-server.herokuapp.com/hospital",
      {
        method: "POST",
        body: JSON.stringify({ ...hosData, id: Date.now() }),
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log(res);
    setFt(ft + 1);
    setHosOpen(false);
  };

  const postDocData = async () => {
    let res = await fetch(
      "https://hospital-doctor-json-server.herokuapp.com/doctor",
      {
        method: "POST",
        body: JSON.stringify({ ...docData, id: Date.now() }),
        headers: { "Content-Type": "application/json" }
      }
    );

    setLt(lt + 1);
    setDocOpen(false);
  };
  return (
    <>
      <Stack my="10px" mx="10px">
        <Button
          onClick={() => setHosOpen(true)}
          variant="solid"
          colorScheme="facebook"
          size="md"
          w="200px"
        >
          {" "}
          Add Hospital{" "}
        </Button>
        <Modal isOpen={hosOpen} onClose={() => setHosOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Hospital</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                value={hosData.hosName}
                placeholder="Hospital Name"
                my="10px"
                onChange={(e) =>
                  setHosData({ ...hosData, hosName: e.target.value })
                }
              />
              <Input
                value={hosData.hosAdd}
                placeholder="Address"
                my="10px"
                onChange={(e) =>
                  setHosData({ ...hosData, hosAdd: e.target.value })
                }
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setHosOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={postHosData}
                variant="outline"
                colorScheme="twitter"
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <hr />
        <Button
          onClick={() => setDocOpen(true)}
          size="md"
          w="200px"
          colorScheme="whatsapp"
        >
          {" "}
          Add Doctor
        </Button>
        <Modal isOpen={docOpen} onClose={() => setDocOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Doctor</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <Input
                  value={docData.docName}
                  onChange={(e) =>
                    setDocData({ ...docData, docName: e.target.value })
                  }
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
                      onClick={(e) =>
                        setDocData({ ...docData, docSpec: "Neohrology" })
                      }
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
                      onClick={(e) =>
                        setDocData({ ...docData, docSpec: "Dentist" })
                      }
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
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setDocOpen(false)}
              >
                Close
              </Button>
              <Button onClick={postDocData} variant="ghost">
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <hr />
      </Stack>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Doctor Details</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Hospital</Th>
              <Th>Specialisation</Th>
              <Th>Salary</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {docList.map((item, i) => (
              <Tr>
                <Td>{i + 1}</Td>
                <Td>{item.docName}</Td>
                <Td>{item.docHos}</Td>
                <Td>{item.docSpec}</Td>
                <Td>{item.docSalary}</Td>
                <Link to={`/doctor/${item.id}`}>
                  <Td>View More Details</Td>
                </Link>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
