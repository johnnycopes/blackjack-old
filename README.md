# Blackjack
<img src="images/screenshots/blackjack.png" alt="Blackjack" width="150px"/>
######
[Live Project](http://jc_blackjack.surge.sh/)   |   [Overview](https://github.com/johnnycopes/blackjack/#overview)   |   [What I Used](https://github.com/johnnycopes/blackjack#what-i-used)   |   [MVP](https://github.com/johnnycopes/blackjack#mvp-minimum-viable-product)   |   [Challenges](https://github.com/johnnycopes/blackjack#challenges--solutions)   |   [Code](https://github.com/johnnycopes/blackjack#code-snippets)   | [Screenshots](https://github.com/johnnycopes/blackjack#screenshots)   |

## Overview:
I made my own version of Blackjack (or "21", as it's known in some places). It was initially assigned as a class project, but I wanted to flesh mine out more so I spent extra time on it. Features include betting, double down, split, and responsive design.

## What I used:
**Languages:**  
* HTML5
* CSS
* SCSS
* JavaScript + jQuery

**Other:**  
* Cards from [openclipart](https://openclipart.org/)
  * *Ace - 10 made by nicubunu -- http://nicubunu.ro*
  * *Face cards made by mariotomo -- https://openclipart.org/user-detail/mariotomo*


## MVP (Minimum Viable Product):
The original assignment was to simply to create a working Blackjack game.

**Initial MVP**
* Ability to hit and stand
* The game recognizes when the player wins, loses, or pushes against the dealer
* Creating a client-facing interface that corresponds with what's happening in underlying code
* Write the program in a functional programming style and then convert it to an object-oriented programming style

**Stretch Goals**
* Device-responsiveness
* Implement money and ability to bet
* Ability to double down and split
* Improve the look of the game and find better card images
* Implement timeouts and transitions to smooth the gameplay

## Challenges & Solutions:
Below are some of the most notable challenges I came across while making this project:

1.  **Challenge:** After getting the MVP up and running, convert all JS code from the function style to an OO style.

    **Solution:** This was one of the main tasks of the original assignment and I found it to be excellent practice. I divided the game into different components in order of complexity (card, hand, deck, overall game) and then combed through my original program and sorted my existing functions into either a method or property of each one. As the size of the program grew, I also ordered the methods of each constructor alphabetically in order to make changes or look them up more quickly.

2.  **Challenge:** Keeping things structured. There are a lot of different possible scenarios in the game and maintaining organization was tough. At times it felt like I was writing spaghetti code.

    **Solution:** The conversion to OOP definitely helped because it compartmentalized the many procedures of the game. Adding game state variables as markers made it easier to manipulate the control flow because I could hinge potential courses of action on conditional statements. Writing comments to summarize what code was doing also helped me keep track of what happens where.

3.  **Challenge:** The addition of Split. It significantly affected every aspect of the game and probably doubled the time I spent on this project.

    **Solution:** Lots of state variables. The Hit and Stand buttons are the main means of taking action in the game, but those two buttons act very differently depending on what the current scenario is. I found that the easiest way to manage this was a) create methods on constructor functions whenever possible to handle calculations and b) divide the control flow up into broad, easy-to-follow paths. Visually, Split was a challenge because now I had to make room for an additional hand on the table. My solution was to put the two hands side by side, but stack the additionally drawn cards on top of each other rather than spreading them out as usual. This kills visibility of the hand, but it was a necessary sacrifice because otherwise there was simply no room to have both. I also created a CSS class that comes into play during Split to indicate to the user which of their two hands they're controlling at the moment.

4. **Challenge:** Using SCSS for the first time.

    **Solution:** This wasn't too difficult, but it did take a little while to figure out how to get started because I had never used SCSS before. I like its features, though, and will definitely be using it in future projects.


## Code Snippets

example 1
```SCSS
```

example 2
``` jQuery
```

## Screenshots
![Homepage]()
![Gameplay]()
![Double down](images/screenshots/double-down.png)
![Split]()
![Tablet]()
![Phone]()

********
