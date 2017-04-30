//
//  PlanetTableViewController.swift
//  PlanetDB
//
//  Created by Antonio Medrano on 4/28/17.
//  Copyright © 2017 Antonio Medrano. All rights reserved.
//

import UIKit

class PlanetTableViewController: UITableViewController {
    
    //MARK: Properties
    
    var planets = [Planet]()
    

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Load the sample data.
        loadSampleMeals()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return planets.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        // Table view cells are reused and should be dequeued using a cell identifier.
        let cellIdentifier = "PlanetTableViewCell"
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? PlanetTableViewCell  else {
            fatalError("The dequeued cell is not an instance of PlanetTableViewCell.")
        }
        
        // Fetches the appropriate planet for the data source layout.
        let planet = planets[indexPath.row]
        
        cell.nameLabel.text = planet.name
        cell.ordinalityLabel.text = String(describing: planet.ordinality!)
        cell.sizeLabel.text = String(describing: planet.size!)
        cell.distanceLabel.text = String(describing: planet.distance!)
        cell.photoImageView.image = planet.photo
        
        return cell
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    
    //MARK: Private Methods
    
    private func loadSampleMeals() {
        
        let photo1 = UIImage(named: "planet1")
        let photo2 = UIImage(named: "planet2")
        
        guard let planet1 = Planet(name: "Earth", ordinality: 3, size: 1, distance: 0, description: "Our humble home",  photo: photo1) else {
            fatalError("Unable to instantiate planet1")
        }
        
        guard let planet2 = Planet(name: "Mars", ordinality: 4, size: 0.107, distance: 1.41, description: "Mars is the dry and inhospitable 4th planet from the Sun. It is here that Matt Damon grew potatoes using his own poop.",  photo: photo2) else {
            fatalError("Unable to instantiate meal2")
        }
        
        planets += [planet1, planet2]
    }
    
}
