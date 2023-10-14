import { useEffect, useState } from 'react'

//component
function BusService({ busArrivalData }) {
  return (
    <ul>
      {busArrivalData.services.map((service) => {
        const result = service.next_bus_mins < 0 ? 'Arrived' : `${service.next_bus_mins} minutes`;
        return (
          <li key={service.bus_no}>
            Bus {service.bus_no} : {result}
          </li>
        )
      })}
    </ul>
  )
}
//normal async func
async function fetchBusArrival(id) {
  const response = await fetch(`https://sg-bus-arrival.sigma-schoolsc1.repl.co/?id=${id}`)
  const data = await response.json();
  return data
}
//component
export default function App() {
  const [busStopId, setBusStopId] = useState('');
  const [busArrivalData, setBusArrivalData] = useState(null)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //console.log('Rendered')
    if (busStopId) {
      setLoading(true);
      fetchBusArrival(busStopId)
        .then((data) => setBusArrivalData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }
  }, [busStopId]); // inside this useEffect run only when busstopid changes

  //normal function
  function handleInputChange(event) {
    setBusStopId(event.target.value);
  }
  function handleSelectChange(event) {
    setBusStopId(event.target.value);
  }

  return (
    <div>
      <h1>Bus Arrival App</h1>
      <input
        type='text'
        value={busStopId}
        onChange={handleInputChange}
        placeholder="Enter Bus Stop ID"
      />

      <select value={busStopId} onChange={handleSelectChange} style={{ marginLeft: '10px' }} >
        <option value="">Select Bus Stop</option>
        <option value="18141">18141</option>
        <option value="18131">18131</option>
        <option value="31019">31019</option>
        <option value="31029">31029</option>
        <option value="31031">31031</option>
        <option value="44009">44009</option>
        <option value="58009">58009</option>
        <option value="52011">52011</option>
        <option value="52019">52019</option>
        <option value="52021">52021</option>
        <option value="52009">52009</option>
        <option value="67199">67199</option>
      </select>

      {loading && <p>Loading...</p>}

      {busArrivalData && busArrivalData.services && (
        <>
          <h2>Bus Stop {busArrivalData.bus_stop_id}</h2>
          <BusService busArrivalData={busArrivalData} />
        </>
      )}
    </div>
  );
}