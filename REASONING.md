# Project Reasoning

## 1. Problem Understanding

The pharmacy needs to manage medicines that may have multiple batches with different expiry dates.

The main challenge is ensuring that:

* Expired medicines are never dispensed.
* The batch expiring earliest is used first.
* Stock quantity remains accurate after dispensing.
* Sellable stock excludes expired batches.

## 2. Technology Choice

### MERN Stack

The project uses the MERN stack:

* MongoDB for persistent data storage
* Express.js for REST APIs
* React.js for the user interface
* Node.js for the backend runtime

This stack was selected because it supports rapid full-stack development and provides a clear separation between frontend, backend, and database responsibilities.

## 3. Data Model

Each medicine batch stores:

* Medicine name
* Batch number
* Expiry date
* Quantity
* Price

A medicine can have multiple batches.

For example:

```text
Paracetamol
 ├── Batch A → 2026-10-01 → 20 units
 ├── Batch B → 2026-12-15 → 50 units
 └── Batch C → 2027-02-10 → 30 units
```

## 4. FEFO Decision

The dispensing algorithm uses **First Expiry, First Out (FEFO)**.

The system:

1. Finds batches for the requested medicine.
2. Removes expired batches from consideration.
3. Sorts valid batches by expiry date in ascending order.
4. Uses the earliest-expiring batch first.
5. Continues with the next batch if more quantity is required.
6. Rejects the request if sufficient valid stock is unavailable.

This prevents earlier-expiring stock from remaining unused while later-expiring stock is dispensed.

## 5. Expired Stock

Expired stock is never considered sellable.

For every inventory calculation, the expiry date is compared with the current date.

Only valid batches contribute to sellable stock.

## 6. Transaction Safety

If a customer requests more quantity than the available valid stock, the system should reject the request without partially updating any batch.

This prevents inconsistent inventory data.

## 7. Search, Sorting and Pagination

Search will allow pharmacy staff to quickly find medicines.

Sorting will allow batches to be ordered by:

* Expiry date
* Medicine name
* Quantity


