//
//  Planet.swift
//  PlanetDB
//
//  Created by Antonio Medrano on 4/27/17.
//  Copyright © 2017 Antonio Medrano. All rights reserved.
//

import UIKit
import os.log

class Planet: NSObject, NSCoding {
    
    //MARK: Properties
    var name: String
    var ordinality: String?
    var size: String?
    var distance: String?
    var descript: String? // can't use variable name "description" because that is an inherited function from NSObject
    var photo: UIImage?
    
    
    //MARK: Archiving Paths
    
    static let DocumentsDirectory = FileManager().urls(for: .documentDirectory, in: .userDomainMask).first!
    static let ArchiveURL = DocumentsDirectory.appendingPathComponent("planets")
    

    //MARK: Types
    struct PropertyKey {
        static let name = "name"
        static let ordinality = "ordinality"
        static let size = "size"
        static let distance = "distance"
        static let descript = "descript"
        static let photo = "photo"
    }
    
    
    //MARK: Initialization
    init?(name: String, ordinality: String?, size: String?, distance: String?, descript: String?, photo: UIImage?) {
        
        // The name must not be empty
        guard !name.isEmpty else {
            return nil
        }
        
        // Initialize stored properties.
        self.name = name
        self.ordinality = ordinality
        self.size = size
        self.distance = distance
        self.descript = descript
        self.photo = photo
    }
    
    
    //MARK: NSCoding
    func encode(with aCoder: NSCoder) {
        aCoder.encode(name, forKey: PropertyKey.name)
        aCoder.encode(ordinality, forKey: PropertyKey.ordinality)
        aCoder.encode(size, forKey: PropertyKey.size)
        aCoder.encode(distance, forKey: PropertyKey.distance)
        aCoder.encode(descript, forKey: PropertyKey.descript)
        aCoder.encode(photo, forKey: PropertyKey.photo)
    }
    
    required convenience init?(coder aDecoder: NSCoder) {
        
        // The name is required. If we cannot decode a name string, the initializer should fail.
        guard let name = aDecoder.decodeObject(forKey: PropertyKey.name) as? String else {
            os_log("Unable to decode the name for a Planet object.", log: OSLog.default, type: .debug)
            return nil
        }
        
        // Because ordinality is an optional property of Planet, just use conditional cast.
        let ordinality = aDecoder.decodeObject(forKey: PropertyKey.ordinality) as? String
        
        // Because photo is an optional property of Planet, just use conditional cast.
        let size = aDecoder.decodeObject(forKey: PropertyKey.size) as? String
        
        // Because photo is an optional property of Planet, just use conditional cast.
        let distance = aDecoder.decodeObject(forKey: PropertyKey.distance) as? String
        
        // Because photo is an optional property of Planet, just use conditional cast.
        let descript = aDecoder.decodeObject(forKey: PropertyKey.descript) as? String
        
        // Because photo is an optional property of Planet, just use conditional cast.
        let photo = aDecoder.decodeObject(forKey: PropertyKey.photo) as? UIImage
        
        // Must call designated initializer.
        self.init(name: name, ordinality: ordinality, size: size, distance: distance, descript: descript, photo: photo)
    }
}

