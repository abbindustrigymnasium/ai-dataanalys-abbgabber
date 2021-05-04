# Schackbot
Med användning av decision trees och minimax algorithmen så spelar datorn shack.

För att köra koden krävs inga installationer då alla packages redan är med i filen och du behöver därför endast öppna html sidan.

Boten har en depth på 3 vilket betyder att den tittar 3 drag framåt för att kunna hitta det bästa draget matematiskt. Den kollar då igenom alla drag som den kan göra och fortsätter så tills den kommer till en depth på 3 då den tillslut evaluerar alla positioner utifrån poäng. Eftersom den evaluerar rekursivt så blir antalet drag som den måste analysera snabbt väldigt stora. På den depth på 1 så måste den analysera 20 drag och på en depth på 2 så måste den analysera 20^2.

Förbättringar som skulle kunna göra är defintivt att optimisera inimax algorithmen med hjälp av alpha-beta pruning. Då slutar den evaluera ett drag då den finner att minst 1 av utfallen skulle vara sämre än de tidigare dragen och man kan på så sätt minska antalet utfall som behöver analyseras.
