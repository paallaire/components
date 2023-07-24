
import './styles/main.pcss';
import { Accordion } from './components/Accordion';
import { DropdownMenu } from './components/DropdownMenu';
import { Tabs } from './components/Tabs';

const accordion: Accordion = new Accordion();
//accordion.openAll(); 
//accordion.closeAll(); 
// accordion.destroy();


// Get the container element
const dd1 = document.querySelector<HTMLElement>('#dd-options');
const dd2 = document.querySelector<HTMLElement>('#dd-options-2');

// Create an instance of DropdownMenu
const dropdown1 = new DropdownMenu(dd1!);
const dropdown2 = new DropdownMenu(dd2!);



document.querySelectorAll('.tabs').forEach(element => {
  console.log('element:', element)
  const tab = new Tabs(element);
  console.log('tab:', tab)
});

