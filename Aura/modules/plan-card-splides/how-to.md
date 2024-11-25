<aside>
Each card by default has the plan card ribbon with text at 0% Opacity in order to keep the same alignment for the top of cards when a ribbon is visible. Do steps below to make 100% Opacity Ribbon on any cards you choose!

**To show a ribbon on a card:**

- Add .with-ribbon combo class to .splide__slide class
- Add .ribbon-is-active combo class to .plan-card_ribbon class
- Add .has-ribbon combo class to .plan-card class
- You can adjust colors for all of these on the combo class level along with adding an additional combo class if needed to have a different color per plan card.

Splide Adds margin-right with whatever value we assign using its gap option but we need to remove the right margin from the last card to keep everything centered. 

**To remove right margin:**

- Add the .no-gap class to the last plan card as a final combo class. This sets the margin-right to 0 important to ensure it’s removed.
</aside>