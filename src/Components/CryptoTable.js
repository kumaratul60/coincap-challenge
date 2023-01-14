import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "../Styles/Table.css";

const CryptoTable = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(30);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    try {
      let res = await fetch("https://api.coincap.io/v2/assets");
      let data = await res.json();
      setApiData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = (curr) => {
    if (curr === "-" && currentPage === 1) {
      return;
    }
    if (curr === "+") {
      setCurrentPage(currentPage + 1);
    } else if (curr === "-") {
      setCurrentPage(currentPage - 1);
    }
  };

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = apiData.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="table-div">
      <TableContainer component={ Paper } sx={ { width: 1100 } }>
        <Table
          sx={ {
            minWidth: 200,
          } }
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={ { cursor: "pointer" } }>

              <TableCell >Rank</TableCell>
              <TableCell align="right" sx={ {
                "&:hover": {
                  textDecoration: 'underline',

                },
              } }>Name</TableCell>
              <TableCell align="right" sx={ {
                "&:hover": {
                  textDecoration: 'underline',
                }
              } }>Price</TableCell>
              <TableCell align="right" sx={ {
                "&:hover": {
                  textDecoration: 'underline',
                }
              } }>Market CAP</TableCell>
              <TableCell align="right" sx={ {
                "&:hover": {
                  textDecoration: 'underline',
                }
              } }>VWAP (24Hrs)</TableCell>
              <TableCell align="right" sx={ {
                "&:hover": {
                  textDecoration: 'underline',
                }
              } }>Supply</TableCell>
              <TableCell align="right" sx={ {
                "&:hover": {
                  textDecoration: 'underline',
                }
              } }>Volume (24Hrs)</TableCell>
              <TableCell align="right" sx={ {
                "&:hover": {
                  textDecoration: 'underline',
                }
              } }>Change (24Hrs)</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            { currentPosts.map((e, i) => (
              <TableRow
                key={ i }
                sx={ {
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "#e7e7e7",
                  },
                  cursor: "pointer",


                } }
              >
                <TableCell component="th" scope="row">
                  { e.rank }
                </TableCell>
                <TableCell align="right" sx={ { "&:hover": { textDecoration: 'underline' } } } >
                  <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
                    <div style={ { display: 'grid', placeItems: 'center' } }>
                      <img
                        style={ { width: "25px", } }
                        src={ `https://assets.coincap.io/assets/icons/${e.symbol.toLowerCase()}@2x.png` }
                        alt=""
                      />
                      { e.symbol }
                    </div>
                    { e.name }

                  </div>

                </TableCell>
                <TableCell align="right">
                  ${ parseInt(e.priceUsd).toFixed(2) }
                </TableCell>
                <TableCell align="right">
                  ${ parseInt(e.marketCapUsd).toFixed(2) }
                </TableCell>
                <TableCell align="right">
                  { parseInt(e.vwap24Hr).toFixed(2) }
                </TableCell>
                <TableCell align="right">
                  ${ parseInt(e.supply).toFixed(2) }
                </TableCell>
                <TableCell align="right">
                  { parseInt(e.volumeUsd24Hr).toFixed(2) }
                </TableCell>
                <TableCell align="right">
                  { parseInt(e.changePercent24Hr) <= 0 ? (
                    <div style={ { color: "red" } }>
                      { parseInt(e.changePercent24Hr).toFixed(2) }%
                    </div>
                  ) : (
                    <div style={ { color: "green" } }>
                      { parseInt(e.changePercent24Hr).toFixed(2) }%
                    </div>
                  ) }
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
      { currentPage === 1 ? (
        <button
          onClick={ () => paginate("+") }
          style={ { margin: "5px", marginTop: "20px", padding: "10px" } }
        >
          View More
        </button>
      ) : (
        <button
          onClick={ () => paginate("-") }
          style={ { margin: "5px", marginTop: "20px", padding: "10px" } }
        >
          Go Back
        </button>
      ) }
    </div>
  );
};

export default CryptoTable;
