#!/bin/bash
# Simple Interest Calculator
# This script calculates simple interest based on user input

echo "Simple Interest Calculator"
echo "=========================="
echo ""

# Prompt user for principal amount
echo "Enter the principal amount:"
read principal

# Prompt user for rate of interest
echo "Enter the rate of interest (in %):"
read rate

# Prompt user for time period
echo "Enter the time period (in years):"
read time

# Calculate simple interest
# Formula: Simple Interest = (Principal × Rate × Time) / 100
simple_interest=$(echo "scale=2; ($principal * $rate * $time) / 100" | bc)

echo ""
echo "=========================="
echo "Calculation Results:"
echo "=========================="
echo "Principal Amount: $principal"
echo "Rate of Interest: $rate%"
echo "Time Period: $time years"
echo "Simple Interest: $simple_interest"
echo "=========================="
