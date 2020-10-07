# Count Down Number Solver

This is a react application developed to solver the Countdown Numbers Problem.
Upload a CSV of the numbers to be used and submit a target number. The app will then iterate over all possible calculations using the the inputted numbers and the expressions ()+-* to see if it is possible to reach the target number.

# Progress

The App is able to read and parse data from a CSV file. It then uses this data to show the values on screen for the user. The user can then enter then enter the target value and submit it. The code is in place to calculate the combination of numbers and expressions to get to the target value. However their is currently a bug that is stopping the function from returning when it has found the correct answer.

# To Do


 1. Fix the bug that is prohibiting the answer from being returned properly
 2. Currently the app doesn't use parenthesis while calculating, this limits the number of possible results. This can be worked around by implementing Normal Polish Notation.
