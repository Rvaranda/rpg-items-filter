import './ItemsTable.css';

function ItemsTable({items}) {
    return (
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Slot</th>
            <th>Rarity</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.slot}</td>
                <td className={`rarity ${item.rarity}`}>{item.rarity}</td>
                <td>{item.rank}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}

export default ItemsTable;