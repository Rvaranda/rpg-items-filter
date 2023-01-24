import { useEffect, useState } from 'react';

import ItemsTable from './components/ItemsTable';
import { itemsFetch } from './config';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items || []);
  const [itemName, setItemName] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    slot: [],
    rarity: [],
    rank: []
  });

  useEffect(() => {
    itemsFetch.get('/item')
    .then(response => {setItems(response.data); setFilteredItems(response.data)});
  }, []);

  function filterItems(value) {
    let newFilteredItems = [...items];
    
    if (filterOptions.slot.length > 0) {
      // Filtra por slot
      newFilteredItems = newFilteredItems.filter(item => 
        filterOptions.slot.includes(item.slot));
    }
  
    if (filterOptions.rarity.length > 0) {
      // Filtra por raridade
      newFilteredItems = newFilteredItems.filter(item =>
        filterOptions.rarity.includes(item.rarity));
    }

    if (value) {
      // Filtra pelo nome
      newFilteredItems = newFilteredItems.filter(item => 
        item.name.toLowerCase().search(value.toLowerCase()) > -1);
    }

    setFilteredItems(newFilteredItems);
  }

  function updateFilterOptions(target, column) {
    let newFilter = {...filterOptions};

    if (target.checked) {
      newFilter[column].push(target.value);
    }
    else {
      // Pequeno truque para remover um item do array sem deixar "buracos"
      newFilter[column].splice(newFilter[column].indexOf(target.value), 1);
    }

    setFilterOptions(newFilter);
    filterItems(itemName);
  }

  return (
    <div className="App">
      <div className='items-filter'>
        <input 
          type='text' 
          placeholder='Item name'
          value={itemName}
          onChange={e => {
            setItemName(e.target.value);
            filterItems(e.target.value);
          }}
        />
        <div className='filter-options'>
          <div className='slot-filter'>
            <fieldset style={{padding: '.4rem .8rem .8rem', height: '100%'}}>
              <legend>Slot</legend>
              <input type='checkbox' id='slot1' name='slot1' value='chest'
                onChange={({target}) => updateFilterOptions(target, 'slot')}/>
              <label htmlFor='slot1'>Chest</label><br/>

              <input type='checkbox' id='slot2' name='slot2' value='legs'
                onChange={({target}) => updateFilterOptions(target, 'slot')}/>
              <label htmlFor='slot2'>Legs</label><br/>

              <input type='checkbox' id='slot3' name='slot3' value='hands'
                onChange={({target}) => updateFilterOptions(target, 'slot')}/>
              <label htmlFor='slot3'>Hands</label><br/>

              <input type='checkbox' id='slot4' name='slot4' value='shoulders'
                onChange={({target}) => updateFilterOptions(target, 'slot')}/>
              <label htmlFor='slot4'>Shoulders</label><br/>

              <input type='checkbox' id='slot5' name='slot5' value='helm'
                onChange={({target}) => updateFilterOptions(target, 'slot')}/>
              <label htmlFor='slot5'>Helm</label><br/>

              <input type='checkbox' id='slot6' name='slot6' value='boots'
                onChange={({target}) => updateFilterOptions(target, 'slot')}/>
              <label htmlFor='slot6'>Boots</label>
            </fieldset>
          </div>
          <div className='rarity-filter'>
            <fieldset style={{padding: '.4rem .8rem .8rem', height: '100%'}}>
              <legend>Rarity</legend>
              <input type='checkbox' id='rarity1' name='rarity1' value='common'
                onChange={({target}) => updateFilterOptions(target, 'rarity')}/>
              <label htmlFor='rarity1'>Common</label><br/>

              <input type='checkbox' id='rarity2' name='rarity2' value='uncommon'
                onChange={({target}) => updateFilterOptions(target, 'rarity')}/>
              <label htmlFor='rarity2'>Uncommon</label><br/>

              <input type='checkbox' id='rarity3' name='rarity3' value='rare'
                onChange={({target}) => updateFilterOptions(target, 'rarity')}/>
              <label htmlFor='rarity3'>Rare</label><br/>
            </fieldset>
          </div>
        </div>
      </div>
      <ItemsTable items={filteredItems}/>
    </div>
  );
}

export default App;
